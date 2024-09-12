export function showAnimation() {
    const animationContainer = document.getElementById('animation-container');
    const animationIcon = document.getElementById('animation-icon');
    
    // Make sure the container is visible
    animationContainer.style.display = 'block';

    // Add class to start animation
    animationContainer.classList.add('animate');

    // Hide the container after animation completes
    setTimeout(() => {
        animationContainer.style.display = 'none'; // Hide the container
        animationContainer.classList.remove('animate'); // Reset the animation class
    }, 2000); // Duration should match the CSS animation duration
}
