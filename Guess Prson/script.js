class PhotoGuessingGame {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.photos = [];
        this.currentPhotoIndex = 0;
        this.currentImage = null;
        this.zoomLevels = [4, 3, 2, 1.5, 1];
        this.currentZoomIndex = 0;
        this.cropX = 0;
        this.cropY = 0;
        
        this.init();
    }
    
    init() {
        this.setupFileSelector();
    }
    
    setupFileSelector() {
        const fileInput = document.getElementById('fileInput');
        const selectBtn = document.getElementById('selectBtn');
        const fileCount = document.getElementById('fileCount');
        
        selectBtn.addEventListener('click', () => {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', async (e) => {
            const files = Array.from(e.target.files);
            
            if (files.length === 0) {
                fileCount.textContent = 'No photos selected';
                return;
            }
            
            fileCount.textContent = `Loading ${files.length} photo(s)...`;
            
            await this.loadPhotosFromFiles(files);
            
            if (this.photos.length > 0) {
                document.getElementById('fileSelector').style.display = 'none';
                document.getElementById('gameArea').style.display = 'flex';
                this.setupEventListeners();
                this.loadPhoto();
            } else {
                fileCount.textContent = 'Failed to load photos. Please try again.';
            }
        });
    }
    
    async loadPhotosFromFiles(files) {
        this.photos = [];
        
        for (let file of files) {
            if (!file.type.startsWith('image/')) continue;
            
            try {
                const img = await this.createImageFromFile(file);
                this.photos.push({ name: file.name, img: img });
            } catch (e) {
                console.error(`Failed to load ${file.name}:`, e);
            }
        }
        
        this.shufflePhotos();
    }
    
    createImageFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error('Failed to load image'));
                img.src = e.target.result;
            };
            
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
    }
    
    shufflePhotos() {
        for (let i = this.photos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.photos[i], this.photos[j]] = [this.photos[j], this.photos[i]];
        }
    }
    
    loadPhoto() {
        if (this.photos.length === 0) return;
        
        this.currentImage = this.photos[this.currentPhotoIndex].img;
        this.currentZoomIndex = 0;
        this.randomizeCropPosition();
        this.updatePhotoName();
        this.render();
    }
    
    randomizeCropPosition() {
        const zoom = this.zoomLevels[this.currentZoomIndex];
        const maxX = this.currentImage.width - (this.currentImage.width / zoom);
        const maxY = this.currentImage.height - (this.currentImage.height / zoom);
        
        this.cropX = Math.random() * maxX;
        this.cropY = Math.random() * maxY;
    }
    
    changeLocation() {
        this.randomizeCropPosition();
        this.render();
    }
    
    zoomOut() {
        if (this.currentZoomIndex < this.zoomLevels.length - 1) {
            this.currentZoomIndex++;
            
            const oldZoom = this.zoomLevels[this.currentZoomIndex - 1];
            const newZoom = this.zoomLevels[this.currentZoomIndex];
            
            const centerX = this.cropX + (this.currentImage.width / oldZoom) / 2;
            const centerY = this.cropY + (this.currentImage.height / oldZoom) / 2;
            
            this.cropX = centerX - (this.currentImage.width / newZoom) / 2;
            this.cropY = centerY - (this.currentImage.height / newZoom) / 2;
            
            this.cropX = Math.max(0, Math.min(this.cropX, this.currentImage.width - (this.currentImage.width / newZoom)));
            this.cropY = Math.max(0, Math.min(this.cropY, this.currentImage.height - (this.currentImage.height / newZoom)));
            
            this.render();
        }
    }
    
    nextPhoto() {
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
        this.loadPhoto();
    }
    
    reloadPhotos() {
        location.reload();
    }
    
    render() {
        if (!this.currentImage) return;
        
        const zoom = this.zoomLevels[this.currentZoomIndex];
        const cropWidth = this.currentImage.width / zoom;
        const cropHeight = this.currentImage.height / zoom;
        
        this.canvas.width = 600;
        this.canvas.height = 400;
        
        this.ctx.imageSmoothingEnabled = false;
        
        this.ctx.drawImage(
            this.currentImage,
            this.cropX, this.cropY, cropWidth, cropHeight,
            0, 0, this.canvas.width, this.canvas.height
        );
        
        this.updateZoomLevel();
    }
    
    updateZoomLevel() {
        const zoom = this.zoomLevels[this.currentZoomIndex];
        document.getElementById('zoomLevel').textContent = `${Math.round(zoom * 100)}%`;
    }
    
    updatePhotoName() {
        document.getElementById('photoName').textContent = this.photos[this.currentPhotoIndex].name;
    }
    
    setupEventListeners() {
        document.getElementById('locationBtn').addEventListener('click', () => this.changeLocation());
        document.getElementById('zoomBtn').addEventListener('click', () => this.zoomOut());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextPhoto());
        document.getElementById('reloadBtn').addEventListener('click', () => this.reloadPhotos());
    }
}

const game = new PhotoGuessingGame();