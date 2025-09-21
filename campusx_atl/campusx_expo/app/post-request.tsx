import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAppState } from '@/lib/state';

export default function PostRequestScreen() {
    const { addRequest } = useAppState();
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [budget, setBudget] = useState('');
    const [status, setStatus] = useState('');

    const submit = () => {
        const budgetUsd = parseFloat(budget) || 0;
        addRequest({ description, location, budgetUsd });
        setStatus('Request posted!');
        setDescription(''); setLocation(''); setBudget('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Post a Request</Text>
            <TextInput placeholder="Describe what you need" value={description} onChangeText={setDescription} style={styles.input} />
            <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
            <TextInput placeholder="Budget (USD)" value={budget} onChangeText={setBudget} keyboardType="decimal-pad" style={styles.input} />
            <Button title="Post" onPress={submit} />
            {status ? <Text style={styles.status}>{status}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    title: { fontSize: 24, fontWeight: '700' },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8 },
    status: { color: 'green', marginTop: 8 }
});

