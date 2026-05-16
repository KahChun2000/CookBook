import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../../components/header';
import { useSelector } from 'react-redux';
import Recipe from '../../../../recipetypes.json';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const MyRecipe = ({ navigation }) => {
    const user = useSelector(state => state.user);
    const insets = useSafeAreaInsets();
    const [search, setSearch] = useState('');
    const [myRecipes, setMyRecipes] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const filtered = Recipe.filter(item => {
                const matchUser =
                    item.createdBy === user?.email ||
                    item.createdBy?.email === user?.email;

                const matchSearch =
                    item.name
                        ?.toLowerCase()
                        .includes(search.toLowerCase());

                return matchUser && matchSearch;
            });

            setMyRecipes(filtered);

            return () => { };
        }, [user, search]),
    );

    const renderRecipe = ({ item }) => {
        const totalDuration = item.prepTime + item.cookTime;

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.card}
                onPress={() =>
                    navigation.navigate('RecipeDetail', {
                        recipe: item,
                    })
                }>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />

                <View style={styles.content}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{item.name}</Text>

                        <TouchableOpacity onPress={() => navigation.navigate('RecipeForm', item)}>
                            <Icon name="pencil" size={22} color="#145214" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                            <Icon name="time-outline" size={18} color="#555" />
                            <Text style={styles.metaText}>
                                {totalDuration} mins
                            </Text>
                        </View>

                        <Text style={styles.dot}>•</Text>

                        <View style={styles.metaItem}>
                            <MaterialCommunityIcons
                                name="signal-cellular-3"
                                size={18}
                                color="#555"
                            />
                            <Text style={styles.metaText}>
                                {item.difficulty}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Header isHomeTab={true} />

            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>My Recipes</Text>
            </View>

            <View style={styles.searchWrapper}>
                <Icon name="search-outline" size={20} color="#999" />

                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search your recipes..."
                    style={styles.searchInput}
                    placeholderTextColor="#999"
                />
            </View>

            <FlatList
                data={myRecipes}
                keyExtractor={item => item.id.toString()}
                renderItem={renderRecipe}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No recipe found
                    </Text>
                }
            />

            <TouchableOpacity
                style={[styles.fab, { bottom: 120 + insets.bottom }]}
                onPress={() => navigation.navigate('RecipeForm')}>
                <Icon name="add" size={34} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default MyRecipe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F4EE',
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },

    headerTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1F3B1F',
    },

    searchWrapper: {
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: '#ECE9E1',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 50,
    },

    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },

    tabRow: {
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 20,
    },

    tabButton: {
        backgroundColor: '#E5E1D9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        marginRight: 12,
    },

    activeTabButton: {
        backgroundColor: '#145214',
    },

    tabText: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },

    activeTabText: {
        color: '#fff',
    },

    listContent: {
        padding: 20,
        paddingBottom: 120,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: 25,
    },

    image: {
        width: '100%',
        height: 220,
    },

    statusBadge: {
        position: 'absolute',
        top: 15,
        left: 15,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },

    statusText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 13,
    },

    content: {
        padding: 18,
    },

    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        flex: 1,
        fontSize: 30,
        fontWeight: '700',
        color: '#222',
    },

    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    metaText: {
        marginLeft: 5,
        color: '#555',
        fontSize: 15,
    },

    dot: {
        marginHorizontal: 10,
        color: '#999',
    },

    dateText: {
        marginTop: 16,
        color: '#777',
        fontSize: 15,
    },

    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#888',
    },

    fab: {
        position: 'absolute',
        right: 25,
        width: 65,
        height: 65,
        borderRadius: 999,
        backgroundColor: '#145214',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
    },
});