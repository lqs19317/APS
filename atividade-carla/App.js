import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

export default function App() {
  const [verReceitaVisivel, setVerReceitaVisivel] = useState(false);
  const [cadastroVisivel, setCadastroVisivel] = useState(false);

  const [nomeReceita, setNomeReceita] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');

  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  const [receitas, setReceitas] = useState([
    {
      id: '1',
      nome: 'Bolo de Cenoura 🥕',
      ingredientes: '3 cenouras médias\n3 ovos\n1 xícara de óleo\n2 xícaras de açúcar\n2 xícaras de farinha de trigo\n1 colher de fermento em pó',
      preparo: '1. Descasque e corte as cenouras.\n\n2. Bata no liquidificador as cenouras, os ovos e o óleo.\n\n3. Acrescente o açúcar e a farinha e misture bem.\n\n4. Adicione o fermento e misture delicadamente.\n\n5. Coloque em uma forma untada e leve ao forno a 180°C por aproximadamente 40 minutos.'
    }
  ]);

  function limparCampos() {
    setNomeReceita('');
    setIngredientes('');
    setModoPreparo('');
  }

  function salvarReceita() {
    if (
      nomeReceita.trim() === '' ||
      ingredientes.trim() === '' ||
      modoPreparo.trim() === ''
    ) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos antes de salvar!'
      );
      return;
    }

    const novaReceita = {
      id: Date.now().toString(),
      nome: nomeReceita,
      ingredientes: ingredientes,
      preparo: modoPreparo
    };

    setReceitas([...receitas, novaReceita]);

    Alert.alert('Sucesso!', 'Receita cadastrada com sucesso!');

    limparCampos();
    setCadastroVisivel(false);
  }

  function cancelarCadastro() {
    limparCampos();
    setCadastroVisivel(false);
  }

  function abrirReceita(receita) {
    setReceitaSelecionada(receita);
    setVerReceitaVisivel(true);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        receitas-app 📱
      </Text>

      <Text style={styles.subtitle}>
        Colecione suas receitas preferidas
      </Text>

      <ScrollView style={styles.listaReceitas}>
        {receitas.map((receita) => (
          <View key={receita.id} style={styles.card}>
            <Text style={styles.cardTitle}>
              {receita.nome}
            </Text>

            <Button
              title="Ver Receita"
              onPress={() => abrirReceita(receita)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Modal para visualizar receita */}
      <Modal
        visible={verReceitaVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVerReceitaVisivel(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>

            {receitaSelecionada && (
              <>
                <Text style={styles.recipeTitle}>
                  {receitaSelecionada.nome}
                </Text>

                <Text style={styles.sectionTitle}>
                  Ingredientes:
                </Text>

                <Text style={styles.recipeText}>
                  {receitaSelecionada.ingredientes}
                </Text>

                <Text style={styles.sectionTitle}>
                  Modo de Preparo:
                </Text>

                <Text style={styles.recipeText}>
                  {receitaSelecionada.preparo}
                </Text>
              </>
            )}

            <Button
              title="Fechar Receita"
              onPress={() => setVerReceitaVisivel(false)}
            />

          </ScrollView>
        </View>
      </Modal>

      {/* Modal para cadastrar nova receita */}
      <Modal
        visible={cadastroVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={cancelarCadastro}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>

            <Text style={styles.recipeTitle}>
              Cadastrar Nova Receita 🍽️
            </Text>

            <Text style={styles.sectionTitle}>
              Nome da Receita:
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite o nome da receita"
              value={nomeReceita}
              onChangeText={setNomeReceita}
            />

            <Text style={styles.sectionTitle}>
              Ingredientes:
            </Text>

            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Digite os ingredientes"
              value={ingredientes}
              onChangeText={setIngredientes}
              multiline={true}
              textAlignVertical="top"
            />

            <Text style={styles.sectionTitle}>
              Modo de Preparo:
            </Text>

            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Digite o modo de preparo"
              value={modoPreparo}
              onChangeText={setModoPreparo}
              multiline={true}
              textAlignVertical="top"
            />

            <View style={styles.buttonContainer}>
              <Button
                title="Salvar"
                onPress={salvarReceita}
                color="#4CAF50"
              />

              <Button
                title="Cancelar"
                onPress={cancelarCadastro}
                color="#B22222"
              />
            </View>

          </ScrollView>
        </View>
      </Modal>

      {/* Botão Flutuante FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setCadastroVisivel(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C29C61',
    paddingTop: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e4e6c3',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    color: '#e4e6c3',
    marginBottom: 20,
  },

  listaReceitas: {
    width: '90%',
    flex: 1,
    marginBottom: 90,
  },

  card: {
    backgroundColor: '#e4e6c3',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5E2E',
    marginBottom: 15,
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },

  modalContent: {
    backgroundColor: '#e4e6c3',
    padding: 25,
    borderRadius: 15,
    marginVertical: 40,
  },

  recipeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#8B5E2E',
    textAlign: 'center',
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5E2E',
    marginTop: 15,
    marginBottom: 10,
  },

  recipeText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#8B5E2E',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
  },

  multilineInput: {
    minHeight: 110,
  },

  buttonContainer: {
    gap: 15,
    marginTop: 25,
    marginBottom: 10,
  },

  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B5E2E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  fabText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 40,
  },
});