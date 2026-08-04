class ProductModel {
  final int id;
  final String name;
  final double price;
  final String type;
  final String size;
  final int quantity;
  final String? image;

  ProductModel({
    required this.id,
    required this.name,
    required this.price,
    required this.type,
    required this.size,
    required this.quantity,
    this.image,
  });

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      id: json["id"],
      name: json["name"],
      price: double.parse(json["price"].toString()),
      type: json["type"],
      size: json["size"],
      quantity: json["quantity"],
      image: json["image"],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "name": name,
      "price": price,
      "type": type,
      "size": size,
      "quantity": quantity,
      "image": image,
    };
  }
}