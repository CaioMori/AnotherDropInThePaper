import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

function App(): React.JSX.Element {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSelectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (result.didCancel) {
        console.log('Seleção de imagem cancelada');
      } else if (result.assets && result.assets.length > 0) {
        // Pegue a primeira imagem selecionada
        const uri = result.assets[0].uri;
        if (uri) {
          setSelectedImage(uri);
        }
      }
    } catch (error) {
      console.log('Erro ao selecionar imagem:', error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flex}>
        <StatusBar barStyle="light-content" />

        <View style={styles.header}>
          <Text style={styles.title}>ADIP</Text>
          <Text style={styles.subtitle}>Leitor de papel hidrossensível</Text>
        </View>

        <ScrollView>
          <TouchableOpacity style={styles.card} onPress={handleSelectImage}>
            <Text style={styles.cardTitle}>Carregar Imagem</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Imagem</Text>
            {selectedImage ? (
              <Image
                source={{uri: selectedImage}}
                style={styles.previewImage}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.cardText}>Nenhuma imagem selecionada</Text>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Resultado</Text>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Começar Agora</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  flex: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginRight: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#DDD',
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 30,
    paddingVertical: 15,
    marginHorizontal: 32,
    marginBottom: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  previewImage: {
    width: 260,
    height: 260,
    borderRadius: 16,
    marginTop: 16,
  },
});

export default App;
