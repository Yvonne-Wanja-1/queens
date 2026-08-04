import 'package:flutter/material.dart';

import '../models/order_model.dart';

class OrderProvider extends ChangeNotifier {
  final List<OrderModel> _orders = [];

  List<OrderModel> get orders => _orders;

  void setOrders(List<OrderModel> orders) {
    _orders
      ..clear()
      ..addAll(orders);

    notifyListeners();
  }

  void clearOrders() {
    _orders.clear();
    notifyListeners();
  }
}