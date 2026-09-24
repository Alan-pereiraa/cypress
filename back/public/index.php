<?php

declare(strict_types=1);

require_once __DIR__ . '/../src/Config/bootstrap.php';

use App\Http\Request;
use App\Http\Response;
use App\Http\Router;
use App\Modules\Health\HealthController;
use App\Modules\Health\HealthService;
use App\Modules\Auth\AuthController;
use App\Modules\Auth\AuthService;
use App\Modules\Products\ProductController;
use App\Modules\Products\ProductRepository;
use App\Modules\Products\ProductService;

$router = new Router();
$healthController = new HealthController(new HealthService());
$authService = new AuthService();
$authController = new AuthController($authService);
$productController = new ProductController(new ProductService(new ProductRepository()));

$router->get('/api/health', [$healthController, 'show']);
$router->post('/api/auth/login', [$authController, 'login']);
$router->get('/api/products', [$productController, 'index']);
$router->post('/api/products', [$productController, 'store']);
$router->put('/api/products', [$productController, 'update']);
$router->delete('/api/products', [$productController, 'destroy']);

try {
    $response = $router->dispatch(Request::fromGlobals());
} catch (Throwable $exception) {
    $response = Response::json([
        'error' => 'Erro interno do servidor',
    ], 500);
}

$response->send();
