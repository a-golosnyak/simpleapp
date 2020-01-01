<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app2.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
<div id="app2">
    <!--div class="blog-header">
        <div class="container">
            <h2 class="blog-title">
                <a class='none-decored' href="/">The Blog</a>
            </h2>
        </div>
    </div-->
    <div class="">
        <div class="navigation navbar navbar-expand-sm p-0">
            <div class="container ">
                <ul class="navbar-nav">
                    <li class="nav-item mb-3 ">
                        <a class="nav-link" href="/">
                            <!--router-link :to='`/`'>
                                <a class="nav-link font-weight-bold" href="">Home</a>
                            </router-link-->
                            <a class="nav-link font-weight-bold" href="/">Home</a>
                        </a>
                    </li>
                </ul>
                <div class="form-inline pull-right" >
                    <a class="nav-link font-weight-bold" href="/login">Login</a>
                    <!--router-link :to="`/login`">
                        <a class="nav-link font-weight-bold" href="/login">Login</a>
                    </router-link-->
                    <a
                        href="/logout"
                        class="nav-link font-weight-bold"
                    >Выйти
                    </a>
                    <a class="nav-link font-weight-bold" href="/register">Register</a>
                    <!--router-link :to="`/register`">
                        <a class="nav-link font-weight-bold" href="/login">Register</a>
                    </router-link-->
                </div>
            </div>
        </div>
    </div>

    <main class="py-4">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div id="login" class="login-container ">
                        <h3 class="mt-5 ml-3">Register</h3>
                        <form method="POST" action="{{ route('register') }}">
                            @csrf
                            <div class="form-control">
                                <input id="email" type="email" name="email" placeholder="Email Address" required autofocus>
                            </div>
                            <div class="form-control mb-3">
                                <input id="password" type="password" name="password" placeholder="Password" required>
                            </div>
                            <div class="form-control">
                                <input id="password_confirm" type="password" name="password_confirm" placeholder="Password Confirm" required>
                            </div>
                            <div class="form-control">
                                <input id="name" type="name" name="name" placeholder="Name" required>
                            </div>
                            <div class="form-control pt-4">
                                <button type="submit" @click="handleSubmit">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>


</div>
</body>
</html>









{{--
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Register') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Name') }}</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" required autofocus>

                                @if ($errors->has('name'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>

                                @if ($errors->has('email'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div> --}}
