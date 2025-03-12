
/**
 * Creates a typewriter effect on a DOM element
 * @param {string} text - The text to display
 * @param {number} speed - Speed of typing in milliseconds
 * @returns {Function} - Function to handle the animation
 */
export const typewriter = (text, speed = 50) => {
  let i = 0;
  
  return (element) => {
    if (!element) return;
    
    // Clear any existing content
    element.textContent = '';
    
    // Remove any existing interval
    if (element._typewriterInterval) {
      clearInterval(element._typewriterInterval);
    }
    
    // Create new interval
    element._typewriterInterval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(element._typewriterInterval);
      }
    }, speed);
    
    // Clean up function
    return () => {
      if (element._typewriterInterval) {
        clearInterval(element._typewriterInterval);
      }
    };
  };
};

/**
 * Creates a fade-in effect for elements as they enter the viewport
 */
export const setupFadeInOnScroll = () => {
  const callback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  };

  const observer = new IntersectionObserver(callback, {
    root: null,
    threshold: 0.1
  });

  document.querySelectorAll('.fade-in-element').forEach(element => {
    element.classList.add('opacity-0');
    observer.observe(element);
  });
};
