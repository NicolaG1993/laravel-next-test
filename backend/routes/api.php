<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

// API Routes - No session middleware here by default
Route::get('/categories', [ProductController::class, 'categories']);
Route::get('/products', [ProductController::class, 'products']);
Route::get('/product/{id}', [ProductController::class, 'product']);
