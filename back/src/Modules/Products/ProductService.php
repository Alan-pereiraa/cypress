<?php

declare(strict_types=1);

namespace App\Modules\Products;

use InvalidArgumentException;

final class ProductService
{
    public function __construct(private readonly ProductRepository $repository)
    {
    }

    public function all(?string $search = null): array
    {
        $products = $this->repository->all();

        if ($search === null || trim($search) === '') {
            return $products;
        }

        $search = mb_strtolower(trim($search));
        return array_values(array_filter($products, static fn (array $product): bool => str_contains(mb_strtolower($product['name']), $search)));
    }

    public function create(string $name, float $price, int $stock): array
    {
        $this->validate($name, $price, $stock);
        $products = $this->repository->all();
        $product = [
            'id' => $this->nextId($products),
            'name' => trim($name),
            'price' => round($price, 2),
            'stock' => $stock,
            'createdAt' => date(DATE_ATOM),
        ];
        $products[] = $product;
        $this->repository->save($products);
        return $product;
    }

    public function update(int $id, string $name, float $price, int $stock): ?array
    {
        $this->validate($name, $price, $stock);
        $products = $this->repository->all();

        foreach ($products as $index => $product) {
            if ((int) $product['id'] === $id) {
                $products[$index] = [...$product, 'name' => trim($name), 'price' => round($price, 2), 'stock' => $stock];
                $this->repository->save($products);
                return $products[$index];
            }
        }

        return null;
    }

    public function delete(int $id): bool
    {
        $products = $this->repository->all();
        $remaining = array_values(array_filter($products, static fn (array $product): bool => (int) $product['id'] !== $id));

        if (count($remaining) === count($products)) {
            return false;
        }

        $this->repository->save($remaining);
        return true;
    }

    private function validate(string $name, float $price, int $stock): void
    {
        if (trim($name) === '') {
            throw new InvalidArgumentException('O nome do produto é obrigatório.');
        }
        if ($price < 0) {
            throw new InvalidArgumentException('O preço não pode ser negativo.');
        }
        if ($stock < 0) {
            throw new InvalidArgumentException('O estoque não pode ser negativo.');
        }
    }

    private function nextId(array $products): int
    {
        return empty($products) ? 1 : max(array_map(static fn (array $product): int => (int) $product['id'], $products)) + 1;
    }
}
