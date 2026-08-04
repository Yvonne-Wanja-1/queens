import 'package:dio/dio.dart';

import '../api/api_client.dart';
import '../api/api_endpoints.dart';
import '../../models/product_model.dart';

class ProductService {
  final ApiClient _apiClient = ApiClient();

  Future<List<ProductModel>> getProducts() async {
    try {
      final response =
          await _apiClient.get(ApiEndpoints.products);

      final List data = response.data["products"];

      return data
          .map(
            (e) => ProductModel.fromJson(e),
          )
          .toList();
    } on DioException {
      rethrow;
    }
  }

  Future<ProductModel> getProduct(int id) async {
    final response = await _apiClient.get(
      "${ApiEndpoints.products}/$id",
    );

    return ProductModel.fromJson(
      response.data["product"],
    );
  }

  Future<void> createProduct(
    Map<String, dynamic> product,
  ) async {
    await _apiClient.post(
      ApiEndpoints.products,
      data: product,
    );
  }

  Future<void> updateProduct(
    int id,
    Map<String, dynamic> product,
  ) async {
    await _apiClient.put(
      "${ApiEndpoints.products}/$id",
      data: product,
    );
  }

  Future<void> deleteProduct(int id) async {
    await _apiClient.delete(
      "${ApiEndpoints.products}/$id",
    );
  }
}