import React, { useState } from 'react';
import {
    Alert,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/header';
import { useSelector } from 'react-redux';
import Recipe from '../../../../recipetypes.json';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RecipeForm = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const user = useSelector(state => state.user);

    const [imageUrl, setImageUrl] = useState(route?.params?.imageUrl || '');
    const [name, setName] = useState(route?.params?.name || '');
    const [category, setCategory] = useState(route?.params?.category || '');
    const [difficulty, setDifficulty] = useState(route?.params?.difficulty || 'Easy');
    const [prepTime, setPrepTime] = useState(route?.params?.prepTime || '0');
    const [cookTime, setCookTime] = useState(route?.params?.cookTime || '0');
    const [servings, setServings] = useState(route?.params?.servings || 2);
    const [country, setCountry] = useState(route?.params?.country || '');
    const [description, setDescription] = useState(route?.params?.description || '');
    const [ingredients, setIngredients] = useState(route?.params?.ingredients || ['']);
    const [steps, setSteps] = useState(route?.params?.steps || ['']);
    const [showDifficultyModal, setShowDifficultyModal] = useState(false);
    const difficulties = ['Easy', 'Medium', 'Hard', 'Intermediate'];

    const addIngredient = () => {
        setIngredients(prev => [...prev, '']);
    };

    const updateIngredient = (text, index) => {
        const updated = [...ingredients];
        updated[index] = text;
        setIngredients(updated);
    };

    const removeIngredient = index => {
        setIngredients(prev => prev.filter((_, i) => i !== index));
    };

    const addStep = () => {
        setSteps(prev => [...prev, '']);
    };

    const updateStep = (text, index) => {
        const updated = [...steps];
        updated[index] = text;
        setSteps(updated);
    };

    const removeStep = index => {
        setSteps(prev => prev.filter((_, i) => i !== index));
    };

    const saveRecipe = () => {
        if (!name.trim()) {
            Alert.alert('Required', 'Please enter recipe title');
            return;
        }

        const recipePayload = {
            id: route?.params?.id
                ? route?.params?.id
                : `r${Recipe.length + 1}`,

            name: name.trim(),
            description: description.trim(),
            cookTime: Number(cookTime) || 0,
            prepTime: Number(prepTime) || 0,
            servings,
            createdBy: user?.email,
            difficulty,
            foodType: category.trim() || 'Others',
            category: category.trim() || 'Others',
            country: country || '',
            rating: 0,
            isPopular: false,
            isFeatured: false,
            imageUrl: imageUrl.trim(),
            ingredients: ingredients.filter(
                x => x.trim() !== '',
            ),
            steps: steps.filter(
                x => x.trim() !== '',
            ),
        };

        if (route?.params?.id) {
            const index = Recipe.findIndex(
                x => x.id === route?.params?.id,
            );

            if (index !== -1) {
                Recipe[index] = recipePayload;
            }

            Alert.alert(
                'Success',
                'Recipe updated successfully',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ],
            );
        } else {
            Recipe.push(recipePayload);

            Alert.alert(
                'Success',
                'Recipe created successfully',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ],
            );
        }
    };

    const deleteRecipe = () => {
        if (!route?.params?.id) return;

        Alert.alert(
            'Delete Recipe',
            'Are you sure you want to delete this recipe?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        const index = Recipe.findIndex(
                            x => x.id === route?.params?.id,
                        );

                        if (index !== -1) {
                            Recipe.splice(index, 1);
                        }

                        Alert.alert(
                            'Deleted',
                            'Recipe deleted successfully',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => navigation.goBack(),
                                },
                            ],
                        );
                    },
                },
            ],
        );
    };

    return (
        <View style={styles.container}>
            <Header />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.content,
                    { paddingBottom: insets.bottom + 120 },
                ]}>

                <TouchableOpacity style={styles.coverBox}>
                    {imageUrl ? (
                        <Image source={{ uri: imageUrl }} style={styles.coverImage} resizeMode='contain' />
                    ) : (
                        <>
                            <Icon name="camera-outline" size={50} color="#777" />
                            <Text style={styles.coverTitle}>Add a Cover Photo</Text>
                            <Text style={styles.coverSub}>
                                High-quality shots inspire confidence
                            </Text>
                        </>
                    )}
                </TouchableOpacity>

                <TextInput
                    value={imageUrl}
                    onChangeText={setImageUrl}
                    placeholder="Paste image URL"
                    style={styles.input}
                    placeholderTextColor={'#C2C9BB'}
                />

                <Text style={styles.label}>Recipe Title</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="e.g., Wild Mushroom Risotto"
                    style={styles.titleInput}
                    multiline
                    placeholderTextColor={'#C2C9BB'}
                />

                <View style={styles.row}>
                    <View style={styles.half}>
                        <Text style={styles.label}>Category</Text>
                        <TextInput
                            value={category}
                            onChangeText={setCategory}
                            placeholder="Italian"
                            style={styles.input}
                            placeholderTextColor={'#C2C9BB'}
                        />
                    </View>

                    <View style={styles.half}>
                        <Text style={styles.label}>Difficulty</Text>

                        <TouchableOpacity
                            style={styles.selectBox}
                            onPress={() => setShowDifficultyModal(true)}
                        >
                            <Text style={styles.selectText}>{difficulty}</Text>
                            <Icon name="chevron-down" size={20} color="#145214" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.timeBox}>
                        <Text style={styles.label}>Prep Time</Text>
                        <TextInput
                            value={(prepTime).toString()}
                            onChangeText={setPrepTime}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.timeBox}>
                        <Text style={styles.label}>Cook Time</Text>
                        <TextInput
                            value={(cookTime).toString()}
                            onChangeText={setCookTime}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.timeBox}>
                        <Text style={styles.label}>Servings</Text>
                        <View style={styles.servingBox}>
                            <TouchableOpacity onPress={() => setServings(Math.max(1, servings - 1))}>
                                <Icon name="remove" size={24} color="#145214" />
                            </TouchableOpacity>

                            <Text style={styles.servingText}>{servings}</Text>

                            <TouchableOpacity onPress={() => setServings(servings + 1)}>
                                <Icon name="add" size={24} color="#145214" />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                <View style={styles.half}>
                    <Text style={styles.label}>Country</Text>
                    <TextInput
                        value={country}
                        onChangeText={setCountry}
                        placeholder="Country"
                        style={styles.input}
                        placeholderTextColor={'#C2C9BB'}
                    />
                </View>

                <Text style={styles.label}>Description</Text>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Share the story behind this dish..."
                    style={styles.descriptionInput}
                    multiline
                    placeholderTextColor={'#C2C9BB'}
                />

                <Text style={styles.sectionTitle}>Ingredients</Text>

                {ingredients.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                        <TextInput
                            value={item}
                            onChangeText={text => updateIngredient(text, index)}
                            placeholder="e.g. 200g Arborio Rice"
                            style={styles.itemInput}
                            placeholderTextColor={'#C2C9BB'}
                        />

                        <TouchableOpacity onPress={() => removeIngredient(index)}>
                            <Icon name="trash-outline" size={22} color="#C10000" />
                        </TouchableOpacity>
                    </View>
                ))}

                <TouchableOpacity style={styles.outlineButton} onPress={addIngredient}>
                    <Icon name="add" size={22} color="#145214" />
                    <Text style={styles.outlineButtonText}>Add Ingredient</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Instructions</Text>

                {steps.map((item, index) => (
                    <View key={index} style={styles.stepRow}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>{index + 1}</Text>
                        </View>

                        <TextInput
                            value={item}
                            onChangeText={text => updateStep(text, index)}
                            placeholder="Describe this step"
                            style={styles.stepInput}
                            multiline
                            placeholderTextColor={'#C2C9BB'}
                        />

                        <TouchableOpacity onPress={() => removeStep(index)}>
                            <Icon name="close" size={18} color="#C10000" />
                        </TouchableOpacity>
                    </View>
                ))}

                <TouchableOpacity style={styles.outlineButton} onPress={addStep}>
                    <Icon name="checkmark-circle-outline" size={22} color="#145214" />
                    <Text style={styles.outlineButtonText}>Add Step</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 15 }]}>
                {route?.params?.id ? (
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={deleteRecipe}
                    >
                        <Icon name="trash-outline" size={22} color="#fff" />
                    </TouchableOpacity>
                ) : null}
                <TouchableOpacity style={styles.saveButton} onPress={saveRecipe}>
                    <Icon name="save-outline" size={22} color="#fff" />
                    <Text style={styles.saveText}>Save Recipe</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={showDifficultyModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowDifficultyModal(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowDifficultyModal(false)}
                >
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Select Difficulty</Text>

                        {difficulties.map(item => (
                            <TouchableOpacity
                                key={item}
                                style={styles.optionItem}
                                onPress={() => {
                                    setDifficulty(item);
                                    setShowDifficultyModal(false);
                                }}
                            >
                                <Text style={styles.optionText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default RecipeForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F6EF',
    },
    content: {
        padding: 22,
    },
    coverBox: {
        height: 220,
        borderRadius: 16,
        borderWidth: 1.5,
        borderStyle: 'dashed',
        borderColor: '#C9D4C5',
        backgroundColor: '#EAE8E1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        overflow: 'hidden',
    },
    coverImage: {
        width: '100%',
        height: '100%',
    },
    coverTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
    },
    coverSub: {
        marginTop: 5,
        fontSize: 13,
        color: '#777',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#145214',
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#F0EDE7',
        borderRadius: 10,
        paddingHorizontal: 14,
        height: 56,
        fontSize: 16,
        color: '#222',
    },
    titleInput: {
        backgroundColor: '#F0EDE7',
        borderRadius: 10,
        paddingHorizontal: 14,
        minHeight: 90,
        fontSize: 20,
        fontWeight: '700',
        color: '#222',
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    half: {
        width: '48%',
    },
    timeBox: {
        width: '31%',
    },
    servingBox: {
        height: 56,
        backgroundColor: '#F0EDE7',
        borderRadius: 10,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    servingText: {
        fontSize: 18,
        color: '#222',
    },
    descriptionInput: {
        backgroundColor: '#F0EDE7',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingTop: 14,
        minHeight: 120,
        fontSize: 16,
        color: '#222',
        textAlignVertical: 'top',
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: '700',
        color: '#145214',
        marginTop: 35,
        marginBottom: 18,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    itemInput: {
        flex: 1,
        backgroundColor: '#F0EDE7',
        borderRadius: 10,
        paddingHorizontal: 14,
        height: 56,
        fontSize: 16,
        color: '#222',
        marginRight: 12,
    },
    outlineButton: {
        height: 58,
        borderWidth: 1,
        borderColor: '#C9D4C5',
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    outlineButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#145214',
        fontWeight: '500',
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 18,
    },
    stepNumber: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#2D632D',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    stepNumberText: {
        color: '#fff',
        fontWeight: '700',
    },
    stepInput: {
        flex: 1,
        minHeight: 80,
        backgroundColor: '#F0EDE7',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingTop: 12,
        fontSize: 16,
        color: '#222',
        textAlignVertical: 'top',
        marginRight: 8,
    },
    bottomBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#F8F6EF',
        paddingHorizontal: 22,
        paddingTop: 15,
        flexDirection: 'row',
        gap: 12,
    },
    saveButton: {
        flex: 1,
        height: 58,
        backgroundColor: '#145214',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    saveText: {
        color: '#fff',
        fontSize: 17,
        marginLeft: 10,
    },
    previewButton: {
        width: 58,
        height: 58,
        backgroundColor: '#FF7A00',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectBox: {
        backgroundColor: '#F0EDE7',
        borderRadius: 10,
        paddingHorizontal: 14,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectText: {
        fontSize: 16,
        color: '#222',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalBox: {
        width: '100%',
        backgroundColor: '#F8F6EF',
        borderRadius: 18,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#145214',
        marginBottom: 12,
    },
    optionItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E3DED3',
    },
    optionText: {
        fontSize: 17,
        color: '#222',
    },
    deleteButton: {
        height: 58,
        backgroundColor: '#B00020',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 58
    },
    deleteText: {
        color: '#fff',
        fontSize: 17,
        marginLeft: 10,
    },
});