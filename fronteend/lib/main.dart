import 'package:flutter/material.dart';

import 'core/theme/app_theme.dart';
import 'routes/app_router.dart';

void main() {
  runApp(const QueensTouchApp());
}

class QueensTouchApp extends StatelessWidget {
  const QueensTouchApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: "Queens' Touch Beauty Shop",

      theme: AppTheme.lightTheme,

      routerConfig: AppRouter.router,
    );
  }
}