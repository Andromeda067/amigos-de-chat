import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { auth } from './firebase';
import { useRouter } from 'expo-router';
import { signOut } from "firebase/auth";
import Svg, { Path } from "react-native-svg";

export default function GameListScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error: any) {
      Alert.alert("Erro", `Erro ao fazer logout: ${error.message}`);
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

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://pbs.twimg.com/profile_images/1628796712490770434/RmQk6QmF_400x400.jpg" }}
          style={styles.logo}
        />
      </View>

      <View style={styles.content}>
        {/* Cabeçalho */}
        <Text style={styles.title}>Escolha um Jogo</Text>
        <Text style={styles.subtitle}>
          Selecione um jogo para começar a jogar agora!
        </Text>

        {/* Lista de jogos */}
        <View style={styles.gameList}>
          <TouchableOpacity
            onPress={() => router.push('/rooms?game=LeagueOfLegends')}
            style={styles.gameButton}
          >
            <Text style={styles.gameText}>🎮 League of Legends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/rooms?game=Valorant')}
            style={styles.gameButton}
          >
            <Text style={styles.gameText}>🎯 Valorant</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/rooms?game=PUBG')}
            style={styles.gameButton}
          >
            <Text style={styles.gameText}>🔫 PUBG</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/rooms?game=MarvelRivals')}
            style={styles.gameButton}
          >
            <Text style={styles.gameText}>🦸 Marvel Rivals</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/rooms?game=DBD')}
            style={styles.gameButton}
          >
            <Text style={styles.gameText}>👻 Dead by Daylight</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Logout */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
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
    marginBottom: 24,
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
  content: {
    flex: 1,
    alignItems: 'center',
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
  gameList: {
    width: '100%',
    gap: 16,
    marginBottom: 24,
  },
  gameButton: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#FF3D00',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});