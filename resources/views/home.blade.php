<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="login-status" content="">
        <meta name="login-token" content="">

        <title>VueBlog</title>
        <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="{{URL::asset('css/app.css')}}" rel="stylesheet">
    </head>
    <body>
        <div id='app'></div>
        <script type="text/javascript" src="{{URL::asset('js/app.js')}}"></script>
    </body>
</html>

