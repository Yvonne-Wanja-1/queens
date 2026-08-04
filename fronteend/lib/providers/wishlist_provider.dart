import 'package:flutter/material.dart';

import '../models/wishlist_model.dart';

class WishlistProvider extends ChangeNotifier {
  final List<WishlistModel> _wishlist = [];

  List<WishlistModel> get wishlist => _wishlist;

  void setWishlist(List<WishlistModel> items) {
    _wishlist
      ..clear()
      ..addAll(items);

    notifyListeners();
  }

  void clearWishlist() {
    _wishlist.clear();
    notifyListeners();
  }
}