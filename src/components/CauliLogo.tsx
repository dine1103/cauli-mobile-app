import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CauliLogoProps {
  size?: number;
  style?: any;
}

export default function CauliLogo({ size = 60, style }: CauliLogoProps) {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* Phần ngọn bông cải xanh */}
      <View style={[styles.florets, { 
        width: size * 0.8, 
        height: size * 0.5,
        top: size * 0.05,
        left: size * 0.1
      }]}>
        {/* Các chấm kết cấu */}
        <View style={[styles.textureDot, { 
          top: size * 0.1, 
          left: size * 0.2, 
          width: size * 0.08, 
          height: size * 0.08 
        }]} />
        <View style={[styles.textureDot, { 
          top: size * 0.2, 
          left: size * 0.5, 
          width: size * 0.06, 
          height: size * 0.06 
        }]} />
        <View style={[styles.textureDot, { 
          top: size * 0.15, 
          left: size * 0.7, 
          width: size * 0.07, 
          height: size * 0.07 
        }]} />
        <View style={[styles.textureDot, { 
          top: size * 0.3, 
          left: size * 0.3, 
          width: size * 0.05, 
          height: size * 0.05 
        }]} />
        <View style={[styles.textureDot, { 
          top: size * 0.25, 
          left: size * 0.6, 
          width: size * 0.06, 
          height: size * 0.06 
        }]} />
      </View>
      
      {/* Phần thân */}
      <View style={[styles.stem, { 
        width: size * 0.6, 
        height: size * 0.4,
        bottom: size * 0.05,
        left: size * 0.2
      }]}>
        {/* Khuôn mặt */}
        <View style={[styles.face, { 
          top: size * 0.1, 
          left: size * 0.15, 
          width: size * 0.3, 
          height: size * 0.2 
        }]}>
          {/* Mắt */}
          <View style={[styles.eye, { 
            top: size * 0.05, 
            left: size * 0.05, 
            width: size * 0.04, 
            height: size * 0.04 
          }]} />
          <View style={[styles.eye, { 
            top: size * 0.05, 
            right: size * 0.05, 
            width: size * 0.04, 
            height: size * 0.04 
          }]} />
          
          {/* Miệng */}
          <View style={[styles.mouth, { 
            bottom: size * 0.05, 
            left: size * 0.1, 
            width: size * 0.1, 
            height: size * 0.03 
          }]} />
          
          {/* Lưỡi */}
          <View style={[styles.tongue, { 
            bottom: size * 0.02, 
            left: size * 0.12, 
            width: size * 0.06, 
            height: size * 0.02
          }]} />
        </View>
        
        {/* Đuôi speech bubble */}
        <View style={[styles.speechTail, { 
          bottom: size * 0.05, 
          left: size * 0.05, 
          width: size * 0.1, 
          height: size * 0.08 
        }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  florets: {
    position: 'absolute',
    backgroundColor: '#4A8C6B',
    borderRadius: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  stem: {
    position: 'absolute',
    backgroundColor: '#8BC34A',
    borderRadius: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  face: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  eye: {
    position: 'absolute',
    backgroundColor: '#000',
    borderRadius: 50,
  },
  mouth: {
    position: 'absolute',
    backgroundColor: '#000',
    borderRadius: 10,
  },
  tongue: {
    position: 'absolute',
    backgroundColor: '#FF5722',
    borderRadius: 5,
  },
  speechTail: {
    position: 'absolute',
    backgroundColor: '#8BC34A',
    borderRadius: 5,
    transform: [{ rotate: '45deg' }],
  },
  textureDot: {
    position: 'absolute',
    backgroundColor: '#3D7A5E',
    borderRadius: 50,
  },
});