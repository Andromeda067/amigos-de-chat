import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { auth, db } from './firebase';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Svg, { Path, Rect } from "react-native-svg"; // Import SVG components

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !username || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    if (!termsAccepted) {
      Alert.alert("Erro", "Você deve aceitar os Termos de Serviço e a Política de Privacidade.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        name,
        username,
        email,
        createdAt: new Date().toISOString(),
      });

      router.push('/games');
    } catch (error: any) {
      Alert.alert("Erro", `Erro ao criar conta: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão voltar */}
      <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
        <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <Path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Cabeçalho */}
        <Text style={styles.title}>Olá,</Text>
        <Text style={styles.title}>Crie sua conta</Text>

        <Text style={styles.subtitle}>Cadastre-se agora para uma experiência completa nos seus jogos!</Text>

        {/* Formulário */}
        <View style={styles.form}>
          {/* Campo Nome */}
          <View style={styles.inputContainer}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={styles.icon}>
              <Path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="#777777"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21"
                stroke="#777777"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Nome completo"
              style={styles.input}
              placeholderTextColor="#999999"
            />
          </View>

          {/* Campo Nome de Usuário */}
          <View style={styles.inputContainer}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={styles.icon}>
              <Path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="#777777"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="#777777"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Nome de usuário"
              style={styles.input}
              placeholderTextColor="#999999"
            />
          </View>

          {/* Campo Email */}
          <View style={styles.inputContainer}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={styles.icon}>
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

          {/* Campo Senha */}
          <View style={styles.inputContainer}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={styles.icon}>
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

          {/* Campo Confirmar Senha */}
          <View style={styles.inputContainer}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={styles.icon}>
              <Rect x="5" y="11" width="14" height="10" rx="2" stroke="#777777" strokeWidth="2" />
              <Path
                d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
                stroke="#777777"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </Svg>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirmar senha"
              style={styles.input}
              placeholderTextColor="#999999"
              secureTextEntry
            />
          </View>
        </View>

        {/* Termos e condições */}
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            {termsAccepted && (
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M5 13L9 17L19 7"
                  stroke="#00E676"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            )}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            Eu concordo com os <Text style={styles.link}>Termos de Serviço</Text> e{" "}
            <Text style={styles.link}>Política de Privacidade</Text>
          </Text>
        </View>

        {/* Botão de Cadastro */}
        <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Criar Conta</Text>
        </TouchableOpacity>

        {/* Link para login */}
        <View style={styles.loginLink}>
          <Text style={styles.loginText}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.loginButton}>Fazer login</Text>
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
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
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
    fontSize: 16,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 4,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  termsText: {
    color: '#999999',
    fontSize: 14,
  },
  link: {
    color: '#00E676',
  },
  signupButton: {
    backgroundColor: '#00E676',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#999999',
    fontSize: 14,
  },
  loginButton: {
    color: '#00E676',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
});