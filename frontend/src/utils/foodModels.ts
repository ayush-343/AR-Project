import * as THREE from 'three';

export const createFoodPlate = (): THREE.Group => {
  const group = new THREE.Group();

  // Create plate
  const plateGeometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
  const plateMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    metalness: 0.3,
    roughness: 0.7,
  });
  const plate = new THREE.Mesh(plateGeometry, plateMaterial);
  plate.position.z = 0;
  group.add(plate);

  // Create food (sphere)
  const foodGeometry = new THREE.SphereGeometry(1.2, 32, 32);
  const foodMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4761d,
    metalness: 0.1,
    roughness: 0.8,
  });
  const food = new THREE.Mesh(foodGeometry, foodMaterial);
  food.position.z = 1;
  group.add(food);

  // Add rotation animation capability
  group.userData.isFood = true;

  return group;
};

export const createNutritionDisplay = (
  foodName: string,
  calories?: string,
  protein?: string,
  carbs?: string,
  fat?: string
): THREE.Group => {
  const group = new THREE.Group();

  // Create canvas texture for nutrition info
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 512, 512);

    // Border
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, 512, 512);

    // Title
    ctx.fillStyle = '#333333';
    ctx.font = 'Bold 50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(foodName, 256, 80);

    // Divider line
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 120);
    ctx.lineTo(462, 120);
    ctx.stroke();

    // Nutrition info
    ctx.font = '28px Arial';
    ctx.fillStyle = '#555555';
    let yPos = 180;
    
    if (calories) {
      ctx.fillText(`Calories: ${calories}`, 256, yPos);
      yPos += 70;
    }
    
    if (protein) {
      ctx.fillText(`Protein: ${protein}`, 256, yPos);
      yPos += 70;
    }
    
    if (carbs) {
      ctx.fillText(`Carbs: ${carbs}`, 256, yPos);
      yPos += 70;
    }
    
    if (fat) {
      ctx.fillText(`Fat: ${fat}`, 256, yPos);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  const geometry = new THREE.PlaneGeometry(4, 4);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const plane = new THREE.Mesh(geometry, material);

  group.add(plane);
  return group;
};

export const createBackgroundEnvironment = (): THREE.Group => {
  const group = new THREE.Group();

  // Create a subtle background sphere
  const envGeometry = new THREE.SphereGeometry(50, 32, 32);
  const envMaterial = new THREE.MeshBasicMaterial({
    color: 0x1a1a2e,
    side: THREE.BackSide,
  });
  const envSphere = new THREE.Mesh(envGeometry, envMaterial);
  group.add(envSphere);

  return group;
};
