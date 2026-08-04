import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

import 'api_endpoints.dart';

class ApiClient {
  late final Dio dio;

  ApiClient() {
    dio = Dio(
      BaseOptions(
        baseUrl: ApiEndpoints.baseUrl,
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 30),
        sendTimeout: const Duration(seconds: 30),

        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      ),
    );

    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          debugPrint("REQUEST => ${options.method} ${options.uri}");
          return handler.next(options);
        },

        onResponse: (response, handler) {
          debugPrint(
            "RESPONSE => ${response.statusCode} ${response.requestOptions.uri}",
          );
          return handler.next(response);
        },

        onError: (DioException error, handler) {
          debugPrint("ERROR => ${error.message}");
          return handler.next(error);
        },
      ),
    );
  }

  Future<Response> get(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    return await dio.get(
      path,
      queryParameters: queryParameters,
      options: options,
    );
  }

  Future<Response> post(
    String path, {
    dynamic data,
    Options? options,
  }) async {
    return await dio.post(
      path,
      data: data,
      options: options,
    );
  }

  Future<Response> put(
    String path, {
    dynamic data,
    Options? options,
  }) async {
    return await dio.put(
      path,
      data: data,
      options: options,
    );
  }

  Future<Response> delete(
    String path, {
    dynamic data,
    Options? options,
  }) async {
    return await dio.delete(
      path,
      data: data,
      options: options,
    );
  }
}