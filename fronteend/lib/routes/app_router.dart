import 'package:fronteend/screens/splash/auth/onboarding_screen.dart';
import 'package:fronteend/screens/splash/splash_screen.dart';
import 'package:go_router/go_router.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: "/",

    routes: [

      GoRoute(
        path: "/",
        builder: (context, state) => const SplashScreen(),
      ),

      GoRoute(
        path: "/onboarding",
        builder: (context, state) => const OnboardingScreen(),
      ),
    ],
  );
}