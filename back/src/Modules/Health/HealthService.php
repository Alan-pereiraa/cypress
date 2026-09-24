<?php

declare(strict_types=1);

namespace App\Modules\Health;

final class HealthService
{
    public function status(): array
    {
        return [
            'status' => 'ok',
            'service' => 'quality-api',
            'timestamp' => date(DATE_ATOM),
        ];
    }
}
