class ReviewModel {
  final int id;
  final int rating;
  final String comment;

  ReviewModel({
    required this.id,
    required this.rating,
    required this.comment,
  });

  factory ReviewModel.fromJson(Map<String, dynamic> json) {
    return ReviewModel(
      id: json["id"],
      rating: json["rating"],
      comment: json["comment"],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "rating": rating,
      "comment": comment,
    };
  }
}