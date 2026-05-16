import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ScrollView,
} from 'react-native';
import Recipe from '../../../../recipetypes.json';
import Header from '../../../components/header';

const RecipeListingScreen = ({ route, navigation }) => {
    const [category, setCategory] = useState('All');
    const [difficulty, setDifficulty] = useState('All');
    const [country, setCountry] = useState('All');
    const [duration, setDuration] = useState('All');
    const [activeFilter, setActiveFilter] = useState(null);
    const [isPopular, setIsPopular] = useState(false);

    const categories = ['All', ...new Set(Recipe.map(x => x.category))];
    const difficulties = ['All', ...new Set(Recipe.map(x => x.difficulty))];
    const countries = ['All', ...new Set(Recipe.map(x => x.country))];

    const durations = [
        'All',
        'Under 15 mins',
        '15 - 30 mins',
        '30 - 60 mins',
        'Above 60 mins',
    ];

    const clearFilters = () => {
        setCategory('All');
        setDifficulty('All');
        setCountry('All');
        setDuration('All');
        setIsPopular(false);
    };

    const filteredRecipes = useMemo(() => {
        return Recipe.filter(item => {
            const totalDuration = item.prepTime + item.cookTime;

            const matchCategory =
                category === 'All' || item.category === category;

            const matchDifficulty =
                difficulty === 'All' || item.difficulty === difficulty;

            const matchCountry =
                country === 'All' || item.country === country;

            const matchPopular =
                !isPopular || item.isPopular === true;

            let matchDuration = true;

            if (duration === 'Under 15 mins') {
                matchDuration = totalDuration < 15;
            } else if (duration === '15 - 30 mins') {
                matchDuration =
                    totalDuration >= 15 && totalDuration <= 30;
            } else if (duration === '30 - 60 mins') {
                matchDuration =
                    totalDuration > 30 && totalDuration <= 60;
            } else if (duration === 'Above 60 mins') {
                matchDuration = totalDuration > 60;
            }

            return (
                matchCategory &&
                matchDifficulty &&
                matchCountry &&
                matchDuration &&
                matchPopular
            );
        });
    }, [category, difficulty, country, duration, isPopular]);

    const getFilterOptions = () => {
        if (activeFilter === 'category') return categories;
        if (activeFilter === 'difficulty') return difficulties;
        if (activeFilter === 'country') return countries;
        if (activeFilter === 'duration') return durations;
        return [];
    };

    const onSelectFilter = value => {
        if (activeFilter === 'category') setCategory(value);
        if (activeFilter === 'difficulty') setDifficulty(value);
        if (activeFilter === 'country') setCountry(value);
        if (activeFilter === 'duration') setDuration(value);

        setActiveFilter(null);
    };

    const renderRecipe = ({ item }) => {
        const totalDuration = item.prepTime + item.cookTime;

        return (
            <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />

                <View style={styles.timeBadge}>
                    <Text style={styles.timeText}>⏱ {totalDuration} mins</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.row}>
                        <Text style={styles.title}>{item.name}</Text>

                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{item.difficulty}</Text>
                        </View>
                    </View>

                    <Text style={styles.description} numberOfLines={2}>
                        {item.description}
                    </Text>

                    <Text style={styles.meta}>
                        {item.category} • {item.country}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const hasFilter =
        category !== 'All' ||
        difficulty !== 'All' ||
        country !== 'All' ||
        duration !== 'All' ||
        isPopular;

    useEffect(() => {
        if (route?.params?.category) {
            setCategory(route.params.category);
        }
    }, [route?.params?.category]);

    useEffect(() => {
        if (route?.params?.category) {
            setCategory(route.params.category);
        }

        if (route?.params?.isPopular !== undefined) {
            setIsPopular(route.params.isPopular);
        }
    }, [route?.params]);

    return (
        <View style={styles.screen}>
            <Header isHomeTab={true} />

            <View style={styles.filterWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FilterButton
                        title="Category"
                        value={category}
                        onPress={() => setActiveFilter('category')}
                    />

                    <FilterButton
                        title="Difficulty"
                        value={difficulty}
                        onPress={() => setActiveFilter('difficulty')}
                    />

                    <FilterButton
                        title="Country"
                        value={country}
                        onPress={() => setActiveFilter('country')}
                    />

                    <FilterButton
                        title="Duration"
                        value={duration}
                        onPress={() => setActiveFilter('duration')}
                    />

                    {
                        route?.params?.isPopular ? (
                            <FilterButton
                                title="Popular"
                                value={isPopular ? 'Popular' : 'All'}
                                onPress={() => setIsPopular(prev => !prev)}
                            />
                        ) : null
                    }


                    {hasFilter && (
                        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                            <Text style={styles.clearButtonText}>Clear</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>

            <FlatList
                data={filteredRecipes}
                keyExtractor={item => item.id}
                renderItem={renderRecipe}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No recipe found</Text>
                }
            />

            <Modal
                visible={!!activeFilter}
                transparent
                animationType="fade"
                onRequestClose={() => setActiveFilter(null)}>
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setActiveFilter(null)}>
                    <TouchableOpacity activeOpacity={1} style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Select Filter</Text>

                        <ScrollView
                            style={styles.optionScroll}
                            showsVerticalScrollIndicator={false}>
                            {getFilterOptions().map(item => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.optionItem}
                                    onPress={() => onSelectFilter(item)}>
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const FilterButton = ({ title, value, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.filterButton,
                value !== 'All' && styles.filterButtonActive,
            ]}
            onPress={onPress}>
            <Text
                style={[
                    styles.filterText,
                    value !== 'All' && styles.filterTextActive,
                ]}>
                {value === 'All' ? title : value} ▼
            </Text>
        </TouchableOpacity>
    );
};

export default RecipeListingScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FAF8EF',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 14,
        backgroundColor: '#FAF8EF',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#154212',
    },
    filterWrapper: {
        paddingLeft: 20,
        marginBottom: 16,
        marginTop: 20
    },
    filterButton: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#D5D8CC',
        backgroundColor: '#fff',
        marginRight: 10,
    },
    filterButtonActive: {
        backgroundColor: '#154212',
        borderColor: '#154212',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    filterTextActive: {
        color: '#fff',
    },
    clearButton: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 24,
        backgroundColor: '#F28C28',
        marginRight: 20,
    },
    clearButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 28,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 230,
    },
    timeBadge: {
        position: 'absolute',
        top: 14,
        left: 14,
        backgroundColor: '#F8FFF2',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    timeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#2E5A32',
    },
    content: {
        padding: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: '800',
        color: '#222',
        marginRight: 10,
    },
    badge: {
        backgroundColor: '#E8EFE7',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    badgeText: {
        fontSize: 12,
        color: '#4A6B4D',
        fontWeight: '600',
    },
    description: {
        fontSize: 12,
        lineHeight: 22,
        color: '#666',
    },
    meta: {
        marginTop: 8,
        fontSize: 12,
        color: '#888',
    },
    emptyText: {
        marginTop: 50,
        textAlign: 'center',
        fontSize: 15,
        color: '#777',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.25)',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    modalBox: {
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 10,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#154212',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    optionScroll: {
        maxHeight: 320,
    },
    optionItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    optionText: {
        fontSize: 16,
        color: '#222',
        fontWeight: '600',
    },
});