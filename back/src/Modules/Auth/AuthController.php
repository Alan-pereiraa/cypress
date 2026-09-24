<?php

declare(strict_types=1);

namespace App\Modules\Auth;

use App\Http\Request;
use App\Http\Response;

final class AuthController
{
    public function __construct(private readonly AuthService $service)
    {
    }

    public function login(Request $request): Response
    {
        $username = trim((string) $request->input('username', ''));
        $password = (string) $request->input('password', '');

        if ($username === '' || $password === '') {
            return Response::json(['error' => 'Informe usuário e senha.'], 422);
        }

        $session = $this->service->authenticate($username, $password);

        if ($session === null) {
            return Response::json(['error' => 'Usuário ou senha inválidos.'], 401);
        }

        return Response::json($session);
    }
}
