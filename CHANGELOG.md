# 📋 Changelog

All notable changes to ByteBerry Frontend will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/compare/v1.1.1...v1.1.2) (2025-10-06)


### ♻️ Code Refactoring

* **dockerfile, healthCheck:** simplify health check script and Dockerfile ([8ff8a53](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/8ff8a53ea173b7cc6d47a7d1e725f581069f44e0))

## [1.1.1](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/compare/v1.1.0...v1.1.1) (2025-10-06)


### ♻️ Code Refactoring

* **HealthDashboard:** rename parameter in formatUptime function ([973fccf](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/973fccfcf5f997150e4d789b4078aa01ebb4454d))

## [1.1.0](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/compare/v1.0.0...v1.1.0) (2025-10-05)


### ✨ Features

* **nginx:** add cache settings for index.html ([e371bff](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/e371bff65e13ec03669aa348c389cdebefaeb9bf))
* **ci:** update BFF URL handling in release workflow ([6b4d94c](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/6b4d94c5596007e673cd28fe70a05bd1223079d2))

## 1.0.0 (2025-10-05)


### ⚠ BREAKING CHANGES

* **container:** Complete architecture implementation

### ✨ Features

* **tests:** add comprehensive tests for health status and container ([c31857c](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/c31857cd7b2bf2ef3f45b27997bd60e471675220))
* **build:** add diagnostic script for local build checks ([d224c77](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/d224c77d9a8ab0b7ebd19b519e287412d80d1d1c))
* Add GitHub Actions workflow for Release-CI of ByteBerry Frontend ([3d2a6f5](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/3d2a6f544c783be466196a28820158ee53b123fb))
* add Health Dashboard and Home pages with routing ([bf64f6e](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/bf64f6e38a64894c47512f80c1386569673389ca)), closes [#3](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/issues/3)
* **docker:** add logging for built application files ([7afd6e4](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/7afd6e4b0ad660a2c3ec751fdabb785467f6d4ba))
* **docker:** add multi-arch Docker support and health checks ([82ae016](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/82ae016b47fa00cfcb2faf0848b656aa1183a2ec)), closes [#4](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/issues/4)
* **ci:** add PR-CI workflow for frontend automation ([2dd3b19](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/2dd3b19ef9bacdd6dc8b4b3cb8dd36ba0034b88b))
* add Vitest configuration and update TypeScript settings for testing ([4f33d3f](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/4f33d3f3f2066582690310ef0a570a1e8c96a779))
* **docker:** copy built application to nginx html directory ([15f005d](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/15f005d8fce33f4e8928935f34fc9fff28c380d6))
* **docker:** enhance Docker testing with content verification ([612dd02](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/612dd02a5ee13dc78e3e0df51e81dfab7b1d82dc))
* **docker:** enhance Nginx configuration and testing ([e3370ce](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/e3370ce5521b70afa0e2c64f90ef00c2b4ce943f))
* **container:** implement dependency injection container ([7137317](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/713731793bcc9f4288bd446810595441620f2c37)), closes [#2](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/issues/2)
* **ci:** improve PR-CI workflow with enhanced logging ([75d2f7b](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/75d2f7bdda4433629b35531859cdeaa1899f76dc))
* initialize project structure with React and Vite ([0c8b81f](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/0c8b81f3f3f44783a1a63c808f419b7633f24220))
* **tests:** refactor App tests to use App component directly ([45c5343](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/45c5343afd2fc8c28a44590b7a17ea7b6a843665)), closes [#5](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/issues/5)
* **ci:** refactor PR-CI workflow to Release-CI ([d84b431](https://github.com/JRuvalcabaFSD/ByteBerry-Frontend/commit/d84b4313c9d809cdbcd96319ec945f485b0ce33a))
