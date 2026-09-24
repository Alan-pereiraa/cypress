<?php

declare(strict_types=1);

namespace App\Modules\Products;

final class ProductRepository
{
    private string $file;

    public function __construct(?string $file = null)
    {
        $this->file = $file ?? dirname(__DIR__, 3) . '/data/products.json';
        $directory = dirname($this->file);

        if (!is_dir($directory)) {
            mkdir($directory, 0775, true);
        }

        if (!is_file($this->file)) {
            file_put_contents($this->file, json_encode([], JSON_PRETTY_PRINT));
        }
    }

    public function all(): array
    {
        $products = json_decode(file_get_contents($this->file) ?: '[]', true);
        return is_array($products) ? $products : [];
    }

    public function save(array $products): void
    {
        file_put_contents($this->file, json_encode(array_values($products), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
    }
}
