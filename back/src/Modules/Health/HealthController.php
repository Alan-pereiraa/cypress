<?php

declare(strict_types=1);

namespace App\Modules\Health;

use App\Http\Request;
use App\Http\Response;

final class HealthController
{
    public function __construct(private readonly HealthService $service)
    {
    }

    public function show(Request $request): Response
    {
        return Response::json($this->service->status());
    }
}
