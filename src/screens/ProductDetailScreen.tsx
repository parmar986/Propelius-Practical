import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Product } from '../types/product';
import { useCart } from '../store/CartContext';

const { width } = Dimensions.get('window');

const ProductDetailScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { product } = route.params as { product: Product };
  const [selectedImage, setSelectedImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { addToCart, isInCart } = useCart();

  const images = [product.image];

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MaterialCommunityIcons
          key={i}
          name="star"
          size={18}
          color={i <= Math.round(rating) ? '#FBBF24' : '#E5E7EB'}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setLiked(!liked)}
        >
          <MaterialCommunityIcons
            name="heart"
            size={24}
            color={liked ? '#EF4444' : '#FFFFFF'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageSection}>
          <View style={styles.mainImageContainer}>
            <Image
              source={{ uri: images[selectedImage] }}
              style={styles.mainImage}
              resizeMode="contain"
            />
          </View>

          {/* Image Thumbnails */}
          <View style={styles.thumbnailContainer}>
            {images.map((img, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.thumbnail,
                  selectedImage === idx && styles.thumbnailActive,
                ]}
                onPress={() => setSelectedImage(idx)}
              >
                <Image
                  source={{ uri: img }}
                  style={styles.thumbnailImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoHeader}>
            <View style={styles.infoLeft}>
              <Text style={styles.category}>{product.category}</Text>
              <Text style={styles.productTitle}>{product.title}</Text>
            </View>
            <View style={styles.infoRight}>
              <Text style={styles.price}>${product.price}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text
              style={styles.description}
              numberOfLines={showFullDescription ? undefined : 3}
            >
              {product.description}
            </Text>
            <TouchableOpacity
              onPress={() => setShowFullDescription(!showFullDescription)}
            >
              <Text style={styles.readMore}>
                {showFullDescription ? 'Show less' : 'Read more'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Rating */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingTitle}>Rating</Text>
            <View style={styles.ratingContent}>
              <View style={styles.stars}>{renderStars(product.rating.rate)}</View>
              <Text style={styles.ratingCount}>({product.rating.count})</Text>
            </View>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={[styles.addButton, isInCart(product.id) && styles.addButtonDisabled]}
            onPress={handleAddToCart}
            disabled={isInCart(product.id)}
          >
            <Text style={styles.addButtonText}>
              {isInCart(product.id) ? 'ADDED TO CART' : 'ADD TO CART'}
            </Text>
          </TouchableOpacity>

          {isInCart(product.id) && (
            <Text style={styles.successMessage}>✓ Added to cart successfully</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  mainImageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginBottom: 16,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  thumbnail: {
    width: 56,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    opacity: 0.6,
  },
  thumbnailActive: {
    opacity: 1,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 400,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoLeft: {
    flex: 1,
  },
  category: {
    fontSize: 14,
    color: '#6B7280',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 28,
  },
  infoRight: {
    alignItems: 'flex-end',
    marginLeft: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 8,
  },
  readMore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  ratingSection: {
    marginBottom: 24,
  },
  ratingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  ratingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  addButton: {
    backgroundColor: '#111827',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#4ADE80',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  successMessage: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#22C55E',
    marginTop: 12,
  },
});

export default ProductDetailScreen;