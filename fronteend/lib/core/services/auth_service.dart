import 'package:dio/dio.dart';

import '../api/api_client.dart';
import '../api/api_endpoints.dart';
import '../../models/user_model.dart';

class AuthService {
  final ApiClient _apiClient = ApiClient();

  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await _apiClient.post(
        ApiEndpoints.login,
        data: {
          "email": email,
          "password": password,
        },
      );

      final data = response.data;

      return {
        "success": true,
        "token": data["token"],
        "user": UserModel.fromJson(data["user"]),
      };
    } on DioException catch (e) {
      return {
        "success": false,
        "message": e.response?.data["message"] ??
            "Login failed.",
      };
    }
  }

  Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String password,
  }) async {
    try {
      final response = await _apiClient.post(
        ApiEndpoints.register,
        data: {
          "name": name,
          "email": email,
          "password": password,
        },
      );

      return {
        "success": true,
        "message": response.data["message"],
      };
    } on DioException catch (e) {
      return {
        "success": false,
        "message": e.response?.data["message"] ??
            "Registration failed.",
      };
    }
  }
}