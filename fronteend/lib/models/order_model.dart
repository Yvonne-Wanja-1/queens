class OrderModel {
  final int id;
  final double totalAmount;
  final String status;

  OrderModel({
    required this.id,
    required this.totalAmount,
    required this.status,
  });

  factory OrderModel.fromJson(Map<String, dynamic> json) {
    return OrderModel(
      id: json["id"],
      totalAmount: double.parse(
        json["total_amount"].toString(),
      ),
      status: json["status"],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "total_amount": totalAmount,
      "status": status,
    };
  }
}