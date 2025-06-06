import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  Alert,
} from 'react-native';

export default function DivApp() {
  const [total, setTotal] = useState('');
  const [people, setPeople] = useState('');
  const [tip, setTip] = useState('');
  const [result, setResult] = useState(null);

  const formatCurrencyInput = (text) => {
    const cleanText = text.replace(/[^0-9,.]/g, '');
    const normalized = cleanText.replace(',', '.');
    const parts = normalized.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    return cleanText;
  };

  const calculate = () => {
    const totalNum = parseFloat(total.replace(',', '.'));
    const peopleNum = parseInt(people);
    const tipNum = tip ? parseFloat(tip.replace(',', '.')) : 0;

    if (isNaN(totalNum) || totalNum <= 0) {
      Alert.alert('Oops!', 'Informe um valor total válido maior que zero.');
      return;
    }
    if (isNaN(peopleNum) || peopleNum <= 0) {
      Alert.alert('Oops!', 'Informe o número de pessoas corretamente.');
      return;
    }
    if (tip && (isNaN(tipNum) || tipNum < 0)) {
      Alert.alert('Oops!', 'Informe uma taxa de serviço válida.');
      return;
    }

    const totalWithTip = totalNum + (totalNum * tipNum) / 100;
    const perPerson = totalWithTip / peopleNum;
    setResult(perPerson);
    Keyboard.dismiss();
  };

  const reset = () => {
    setTotal('');
    setPeople('');
    setTip('');
    setResult(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>DivApp 🍽️</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Valor Total da Conta (R$):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 120,50"
          keyboardType="decimal-pad"
          value={total}
          onChangeText={(text) => setTotal(formatCurrencyInput(text))}
          maxLength={10}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Número de Pessoas:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 4"
          keyboardType="number-pad"
          value={people}
          onChangeText={setPeople}
          maxLength={3}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Taxa de Serviço (%) - Opcional:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 10"
          keyboardType="decimal-pad"
          value={tip}
          onChangeText={(text) => setTip(formatCurrencyInput(text))}
          maxLength={5}
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, styles.calcButton]} onPress={calculate}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={reset}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {result !== null && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            Cada pessoa deve pagar:{' '}
            <Text style={styles.amount}>R$ {result.toFixed(2).replace('.', ',')}</Text>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffefc1',
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#ff6f61',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'Comic Sans MS',
    textShadowColor: '#ffb3a7',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
    color: '#d35400',
    marginBottom: 8,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#fff5e6',
    borderWidth: 2,
    borderColor: '#ff6f61',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#333',
    shadowColor: '#ff6f61',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#ff6f61',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  calcButton: {
    backgroundColor: '#ff6f61',
  },
  resetButton: {
    backgroundColor: '#ffa07a',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  resultBox: {
    backgroundColor: '#fff8e1',
    padding: 30,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#ff6f61',
    alignItems: 'center',
    shadowColor: '#ff6f61',
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
  },
  resultText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#d84315',
    textAlign: 'center',
  },
  amount: {
    color: '#bf360c',
  },
});
