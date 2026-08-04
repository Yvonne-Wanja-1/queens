import 'package:flutter/material.dart';

import '../models/cart_model.dart';

class CartProvider extends ChangeNotifier {
  final List<CartModel> _cart = [];

  List<CartModel> get cart => _cart;

  void setCart(List<CartModel> items) {
    _cart
      ..clear()
      ..addAll(items);

    notifyListeners();
  }

  void clearCart() {
    _cart.clear();
    notifyListeners();
  }
}