// Modal Control
  const musicCard = document.getElementById('musicCard');
  const musicModal = document.getElementById('musicModal');
  const closeBtn = document.getElementById('closeBtn');
  const songItems = document.querySelectorAll('.song-item');
  const songTitle = document.getElementById('songTitle');
  const playBtn = document.querySelector('.btn-play');
  const audioPlayer = document.getElementById('audioPlayer');
  const progressBar = document.querySelector('.progress-bar');
  const progress = document.querySelector('.progress');
  const currentTimeEl = document.querySelector('.current-time');
  const totalTimeEl = document.querySelector('.total-time');

  let isPlaying = false;

  // Open Modal
  musicCard.addEventListener('click', () => {
    musicModal.classList.add('active');
  });

  // Close Modal
  closeBtn.addEventListener('click', () => {
    musicModal.classList.remove('active');
  });

  // Close Modal when clicking outside
  musicModal.addEventListener('click', (e) => {
    if (e.target === musicModal) {
      musicModal.classList.remove('active');
    }
  });

  // Format time function
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Update progress bar
  audioPlayer.addEventListener('timeupdate', () => {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = percent + '%';
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
  });

  // Set total time when metadata loads
  audioPlayer.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audioPlayer.duration);
  });

  // Click on progress bar to seek
  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = percent * audioPlayer.duration;
  });

  // End of song
  audioPlayer.addEventListener('ended', () => {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  });

  // Song Selection
  songItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      songItems.forEach(i => i.classList.remove('active'));
      // Add active class to clicked item
      item.classList.add('active');
      // Update title
      songTitle.textContent = item.dataset.song;
      
      // Map song
      const songMap = {
        'Ai Ngoài Anh': 'sound/aingoaiem.mp3',
        'When Was Your Man': 'sound/wheniwasyourman.mp3',
        'Ngủ Đúng Giờ': 'sound/ngudunggio.mp3',
        'Có Hẹn Với Thanh Xuân': 'sound/cohenvoithanhxuan.mp3',
        'Dạo Này': 'sound/daonay.mp3',
        'Thế Giới Của Anh': 'sound/thegioicuaanh.mp3'
 
      };
      
      audioPlayer.src = songMap[item.dataset.song];
      
      // Play the song
      audioPlayer.play();
      isPlaying = true;
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
  });

  // Play/Pause Button
  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      audioPlayer.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      audioPlayer.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
  });

  // Previous Button
  document.querySelector('.btn-control:first-of-type').addEventListener('click', () => {
    const currentIndex = Array.from(songItems).findIndex(item => item.classList.contains('active'));
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : songItems.length - 1;
    songItems[prevIndex].click();
  });

  // Next Button
  document.querySelector('.btn-control:last-of-type').addEventListener('click', () => {
    const currentIndex = Array.from(songItems).findIndex(item => item.classList.contains('active'));
    const nextIndex = currentIndex < songItems.length - 1 ? currentIndex + 1 : 0;
    songItems[nextIndex].click();
  });


  // ==================== LETTER MODAL ==================== 
 const letterCard = document.getElementById('letterCard');
  const letterModal = document.getElementById('letterModal');
  const closeLetterBtn = document.getElementById('closeLetterBtn');
  const letterLines = document.querySelectorAll('.letter-line');

  if (letterCard && letterModal) {
    letterCard.addEventListener('click', () => {
      console.log('Letter card clicked');
      letterModal.classList.add('active');
      
      // Reset animation
      letterLines.forEach((line, index) => {
        // Remove animation
        line.style.animation = 'none';
        
        // Trigger reflow to restart animation
        void line.offsetWidth;
        
        // Add animation with delay
        setTimeout(() => {
          line.style.animation = `typewriter 1.5s ease-out forwards`;
          line.style.animationDelay = `${index * 1.8}s`;
        }, 10);
      });
    });

    if (closeLetterBtn) {
      closeLetterBtn.addEventListener('click', () => {
        letterModal.classList.remove('active');
      });
    }

    letterModal.addEventListener('click', (e) => {
      if (e.target === letterModal) {
        letterModal.classList.remove('active');
      }
    });
  }