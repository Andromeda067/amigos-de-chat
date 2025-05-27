import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { auth } from './firebase';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import Svg, { Rect, Path } from 'react-native-svg'; // Import SVG components

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/games');
    } catch (error: any) {
      Alert.alert("Erro", `Erro ao fazer login: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: "https://pbs.twimg.com/profile_images/1628796712490770434/RmQk6QmF_400x400.jpg" }}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Olá,</Text>
        <Text style={styles.title}>Bem-vindo(a)</Text>
        <Text style={styles.subtitle}>
          Faça login agora para a melhor experiência nos seus jogos!
        </Text>

        {/* Formulário */}
        <View style={styles.form}>
          {/* Email */}
          <View style={styles.inputContainer}>
            <Svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style={styles.icon}
            >
              <Rect x="4" y="6" width="16" height="12" rx="2" stroke="#777777" strokeWidth="2" />
              <Path
                d="M4 9L11.1056 12.5528C11.6686 12.8343 12.3314 12.8343 12.8944 12.5528L20 9"
                stroke="#777777"
                strokeWidth="2"
              />
            </Svg>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="email@example.com"
              style={styles.input}
              placeholderTextColor="#999999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Senha */}
          <View style={styles.inputContainer}>
            <Svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style={styles.icon}
            >
              <Rect x="5" y="11" width="14" height="10" rx="2" stroke="#777777" strokeWidth="2" />
              <Path
                d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
                stroke="#777777"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </Svg>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              style={styles.input}
              placeholderTextColor="#999999"
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        {/* Botão de login */}
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Link para cadastro */}
        <View style={styles.registerLink}>
          <Text style={styles.registerText}>Não tem conta? </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerButton}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    color: '#999999',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 16,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    padding: 12,
    fontSize: 16,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#00E676',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#00E676',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#999999',
    fontSize: 14,
  },
  registerButton: {
    color: '#00E676',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
});