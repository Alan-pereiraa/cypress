<?php

declare(strict_types=1);

namespace App\Modules\Auth;

final class AuthService
{
    private const USERNAME = 'admin';
    private const PASSWORD = 'admin123';

    public function authenticate(string $username, string $password): ?array
    {
        if ($username !== self::USERNAME || $password !== self::PASSWORD) {
            return null;
        }

        return [
            'token' => base64_encode(self::USERNAME . ':' . bin2hex(random_bytes(16))),
            'user' => ['username' => self::USERNAME, 'name' => 'Administrador'],
        ];
    }

    public function isValidToken(?string $token): bool
    {
        return is_string($token) && str_starts_with($token, base64_encode(self::USERNAME . ':'));
    }
}
