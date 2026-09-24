<?php

declare(strict_types=1);

namespace App\Modules\Products;

use App\Http\Request;
use App\Http\Response;
use App\Modules\Auth\AuthService;
use InvalidArgumentException;

final class ProductController
{
    private AuthService $auth;

    public function __construct(private readonly ProductService $service)
    {
        $this->auth = new AuthService();
    }

    public function index(Request $request): Response
    {
        if ($response = $this->authorize($request)) {
            return $response;
        }
        return Response::json(['data' => $this->service->all((string) $request->query('search', ''))]);
    }

    public function store(Request $request): Response
    {
        if ($response = $this->authorize($request)) {
            return $response;
        }
        try {
            return Response::json(['data' => $this->service->create((string) $request->input('name'), (float) $request->input('price'), (int) $request->input('stock'))], 201);
        } catch (InvalidArgumentException $exception) {
            return Response::json(['error' => $exception->getMessage()], 422);
        }
    }

    public function update(Request $request): Response
    {
        if ($response = $this->authorize($request)) {
            return $response;
        }
        try {
            $product = $this->service->update((int) $request->input('id'), (string) $request->input('name'), (float) $request->input('price'), (int) $request->input('stock'));
            return $product ? Response::json(['data' => $product]) : Response::json(['error' => 'Produto não encontrado.'], 404);
        } catch (InvalidArgumentException $exception) {
            return Response::json(['error' => $exception->getMessage()], 422);
        }
    }

    public function destroy(Request $request): Response
    {
        if ($response = $this->authorize($request)) {
            return $response;
        }
        return $this->service->delete((int) $request->input('id'))
            ? Response::json(['message' => 'Produto excluído.'])
            : Response::json(['error' => 'Produto não encontrado.'], 404);
    }

    private function authorize(Request $request): ?Response
    {
        return $this->auth->isValidToken($request->bearerToken()) ? null : Response::json(['error' => 'Não autorizado.'], 401);
    }
}
