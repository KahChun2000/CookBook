import React, { useState } from 'react';
import {
    Dimensions,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Header from '../../../components/header';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RecipeDetail = ({ route }) => {
    const insets = useSafeAreaInsets();
    const recipe = route?.params?.recipe;
    const totalDuration = recipe.prepTime + recipe.cookTime;
    const [activeStep, setActiveStep] = useState(0);

    return (
        <View style={styles.screen}>
            <Header />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom ? insets.bottom : 20 }}>
                <ImageBackground
                    source={{ uri: recipe.imageUrl }}
                    style={styles.heroImage}>
                    <LinearGradient
                        style={{ flex: 1, justifyContent: 'flex-end' }}
                        colors={['#0A0A0A', 'rgba(10, 10, 10, 0.33)', 'rgba(255, 255, 255, 0.00)']}
                        start={{ x: 0.5, y: 1 }}
                        end={{ x: 0.5, y: 0 }}
                    >

                        <View style={styles.heroContent}>
                            <View style={styles.tagRow}>
                                <View style={styles.orangeTag}>
                                    <Text style={styles.orangeTagText}>{recipe.category}</Text>
                                </View>

                                <View style={styles.greenTag}>
                                    <Text style={styles.greenTagText}>{recipe.difficulty}</Text>
                                </View>
                            </View>

                            <Text style={styles.recipeTitle}>{recipe.name}</Text>

                            <View style={styles.infoRow}>
                                <Text style={styles.infoText}>⏱ {totalDuration} mins</Text>
                                <Text style={styles.infoText}>🍽 {recipe.servings} Servings</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>

                <View style={styles.body}>
                    <Text style={styles.description}>{recipe.description}</Text>

                    {recipe.ingredients?.length > 0 && (
                        <>
                            <Text style={styles.sectionTitle}>Ingredients</Text>

                            <View style={styles.ingredientsGrid}>
                                {recipe.ingredients.map((item, index) => (
                                    <View key={index} style={styles.ingredientBox}>
                                        <View style={styles.checkCircle}>
                                            <Text style={styles.checkText}>✓</Text>
                                        </View>
                                        <Text style={styles.ingredientText}>{item}</Text>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}

                    {recipe.steps?.length > 0 && (
                        <>
                            <Text style={styles.sectionTitle}>Step-by-Step</Text>

                            {recipe.steps.map((step, i) => {
                                const isActive = activeStep === i;
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => setActiveStep(i)}
                                        style={({ pressed }) => [
                                            styles.step,
                                            {
                                                borderRadius: 18,
                                                opacity: pressed ? 0.9 : 1,
                                            },
                                        ]}
                                    >
                                        {isActive ? (
                                            <View style={[styles.stepInner, { backgroundColor: '#154212', borderWidth: 1, borderColor: '#EBEBEB', borderRadius: 18 }]}>
                                                <View style={styles.stepNumWrap}>
                                                    <Text style={[styles.stepNum, { color: "#FFF" }]}>{i + 1}</Text>
                                                </View>
                                                <Text style={[styles.stepText, { color: "#FFF" }]}>{step}</Text>
                                            </View>
                                        ) : (
                                            <View style={[styles.stepInner, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EBEBEB', borderRadius: 18 }]}>
                                                <View style={[styles.stepNumWrap, { backgroundColor: '#F0EFEB' }]}>
                                                    <Text style={[styles.stepNum, { color: '#8A8A8A' }]}>{i + 1}</Text>
                                                </View>
                                                <Text style={[styles.stepText, { color: '#111111' }]}>{step}</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default RecipeDetail;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FAF8EF',
    },
    heroImage: {
        width: '100%',
        height: Dimensions.get('window').height * 0.35,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    heroContent: {
        paddingHorizontal: 22,
        paddingBottom: 22,
    },
    tagRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    orangeTag: {
        backgroundColor: '#FF8A1D',
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        marginRight: 8,
    },
    orangeTagText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
    },
    greenTag: {
        backgroundColor: '#2D6B32',
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
    },
    greenTagText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#DDF0DD',
    },
    recipeTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
        marginRight: 18,
    },
    body: {
        paddingHorizontal: 22,
        paddingTop: 20,
    },
    description: {
        fontSize: 14,
        lineHeight: 25,
        color: '#5E665B',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#154212',
        marginBottom: 20,
    },
    ingredientsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    ingredientBox: {
        width: '48%',
        minHeight: 56,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        elevation: 2,
    },
    checkCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#1F6B2A',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '800',
    },
    ingredientText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
    },
    stepRow: {
        flexDirection: 'row',
        marginBottom: 28,
    },
    stepNumber: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#2D6B32',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 18,
        marginTop: 2,
    },
    stepNumberText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#2D6B32',
        marginBottom: 6,
    },
    stepDescription: {
        fontSize: 16,
        lineHeight: 24,
        color: '#5E665B',
    },
    step: { overflow: "hidden" },
    stepInner: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 14,
        gap: 12,
    },
    stepNumWrap: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        backgroundColor: "rgba(255,255,255,0.22)",
    },
    stepNum: { fontSize: 13, fontFamily: "Inter_700Bold" },
    stepText: { flex: 1, fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 22, paddingTop: 4 },
    shopHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
});