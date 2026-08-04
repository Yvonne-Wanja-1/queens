class WishlistModel {
  final int id;
  final int productId;

  WishlistModel({
    required this.id,
    required this.productId,
  });

  factory WishlistModel.fromJson(Map<String, dynamic> json) {
    return WishlistModel(
      id: json["id"],
      productId: json["product_id"],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "product_id": productId,
    };
  }
}