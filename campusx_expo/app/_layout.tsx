import { Stack, Tabs } from 'expo-router';
import { AppStateProvider } from '@/lib/state';

export default function RootLayout() {
    return (
        <AppStateProvider>
            <Tabs screenOptions={{ headerShown: false }}>
                <Tabs.Screen name="index" options={{ title: 'Home' }} />
                <Tabs.Screen name="vendors" options={{ title: 'Vendors' }} />
                <Tabs.Screen name="post-service" options={{ title: 'Post Service' }} />
                <Tabs.Screen name="post-request" options={{ title: 'Post Request' }} />
                <Tabs.Screen name="requests" options={{ title: 'Requests' }} />
            </Tabs>
        </AppStateProvider>
    );
}