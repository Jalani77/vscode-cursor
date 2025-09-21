import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAppState } from '@/lib/state';

export default function VendorSignupScreen() {
    const { addVendor } = useAppState();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const submit = () => {
        addVendor({ name, category, description, rating: 5.0 });
        setStatus('Vendor profile created!');
        setName(''); setCategory(''); setDescription('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vendor Signup</Text>
            <TextInput placeholder="Business/Display Name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Category (e.g., Hair, Repair, Tutoring)" value={category} onChangeText={setCategory} style={styles.input} />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={[styles.input, { height: 100 }]} multiline />
            <Button title="Create Vendor" onPress={submit} />
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

