import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../../../components/header'
import Carousel from "react-native-reanimated-carousel";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Recipe from '../../../../recipetypes.json'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Dashboard = () => {

    const insets = useSafeAreaInsets();

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#FAF8EF" }}>
            <Header isHomeTab={true} />
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 20, paddingBottom: 120 + insets.bottom }}>
                <Banner recipes={Recipe} />
                <Categories recipes={Recipe} />
                <PopularFood recipes={Recipe} />
            </ScrollView>
        </GestureHandlerRootView>
    )
}

const Banner = ({ recipes }) => {

    const featuredRecipes = recipes.filter(item => item.isFeatured);
    const navigation = useNavigation();

    return (
        <View>
            <Carousel
                height={450}
                width={width}
                data={featuredRecipes}
                mode="horizontal-stack"
                modeConfig={{
                    stackInterval: 18,
                    scaleInterval: 0.08,
                    opacityInterval: 0.15,
                }}
                loop
                autoPlay
                autoPlayInterval={3000}
                scrollAnimationDuration={800}

                panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                    failOffsetY: [-5, 5],
                }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <ImageBackground
                            source={{ uri: item.imageUrl }}
                            style={styles.image}
                            imageStyle={styles.imageRadius}
                        >
                            <View style={styles.overlay} />

                            <View style={styles.content}>
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>Featured Recipe</Text>
                                </View>

                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.description}>{item.description}</Text>

                                <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}>
                                    <Text style={styles.buttonText}>🍴 Start Cooking</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                )}
            />
        </View>
    )

}

const Categories = ({ recipes }) => {
    const navigation = useNavigation();
    const categories = [...new Set(recipes.map(item => item.category))];

    const categoryImages = {
        Italian:
            'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
        Vegan:
            'https://images.unsplash.com/photo-1547592180-85f173990554',
        Dessert:
            'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
        Asian:
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        Breakfast:
            'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a',
        Lunch:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        Dinner:
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    };

    const formattedCategories = categories.map(category => ({
        name: category,
        image:
            categoryImages[category] ||
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    }));

    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Quick Categories</Text>
            </View>
            <FlatList
                horizontal
                data={formattedCategories}
                keyExtractor={item => item.name}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.categoriesItem}
                        onPress={() =>
                            navigation.navigate('Recipes', {
                                category: item.name,
                            })
                        }
                    >
                        <Image source={{ uri: item.image }} style={styles.categoriesImage} />
                        <Text style={styles.categoriesTitle}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const PopularFood = ({ recipes }) => {
    const navigation = useNavigation();
    const popularRecipes = recipes.filter(item => item.isPopular);

    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular Recipe</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('Recipes', {
                            isPopular: true,
                        })
                    }
                >
                    <Text style={styles.sectionViewAll}>View All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={popularRecipes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.recipeCard}
                        onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
                    >
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.recipeImage}
                        />

                        <View style={styles.timeBadge}>
                            <Text style={styles.timeText}>
                                ⏱ {item.cookTime} mins
                            </Text>
                        </View>

                        <View style={styles.recipeContent}>
                            <View style={styles.recipeTopRow}>
                                <Text style={styles.recipeName}>
                                    {item.name}
                                </Text>

                                <View style={styles.difficultyBadge}>
                                    <Text style={styles.difficultyText}>
                                        {item.difficulty}
                                    </Text>
                                </View>
                            </View>

                            <Text
                                numberOfLines={2}
                                style={styles.recipeDescription}
                            >
                                {item.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
            />

        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    card: {
        width: width - 32,
        height: 450,
        alignSelf: 'center',
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    imageRadius: {
        borderRadius: 18,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.35)',
    },
    content: {
        padding: 20,
        paddingBottom: 24,
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: '#F28C28',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        marginBottom: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '600',
    },
    title: {
        color: '#fff',
        fontSize: 23,
        fontWeight: '700',
        marginBottom: 4,
    },
    description: {
        color: '#eee',
        fontSize: 13,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#245c1f',
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    container: {
        marginTop: 20
    },
    categoriesItem: {
        alignItems: 'center',
        marginRight: 18,
    },
    categoriesImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    categoriesTitle: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '600',
        color: '#111',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#154212'
    },
    sectionViewAll: {
        fontSize: 14,
        color: '#154212'
    },
    recipeCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },

    recipeImage: {
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
        fontWeight: '600',
        color: '#2E5A32',
    },

    recipeContent: {
        padding: 18,
    },

    recipeTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    recipeName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222',
        flex: 1,
        marginRight: 10,
    },

    difficultyBadge: {
        backgroundColor: '#E8EFE7',
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },

    difficultyText: {
        fontSize: 12,
        color: '#4A6B4D',
        fontWeight: '500',
    },

    recipeDescription: {
        fontSize: 12,
        lineHeight: 22,
        color: '#666',
    },
})