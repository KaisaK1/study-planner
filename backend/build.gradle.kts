plugins {
    java
    jacoco
    alias(libs.plugins.spring.boot)
    alias(libs.plugins.spring.dependency.management)
    alias(libs.plugins.spotless)
    alias(libs.plugins.sonarqube)
}

group = "com.studyplanner"
version = "0.0.1-SNAPSHOT"
description = "StudyPlanner application"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(25)
	}
}

repositories {
	mavenCentral()
}

dependencies {
    implementation(libs.spring.boot.starter.webmvc) 
    implementation(libs.springdoc.webmvc.ui)
    implementation(libs.spring.boot.starter.data.jpa)
    implementation(libs.liquibase)

    developmentOnly(libs.spring.boot.devtools)

    testImplementation(libs.spring.boot.starter.test)
    testImplementation(libs.spring.boot.starter.webmvc.test)

    runtimeOnly(libs.postgresql)
    compileOnly(libs.lombok)
    annotationProcessor(libs.lombok)
}

spotless {
    java {
        googleJavaFormat()
        target("src/**/*.java")
    }
}

tasks.named("compileJava") {
    dependsOn("spotlessApply")
}
