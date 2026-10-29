<template>
  <div class="team-card">
    <div class="team-photo-wrapper">
      <div class="team-photo-placeholder">
        <!-- <div v-if="currentUserIsAdmin" class="upload-zone">
          <button 
            type="button" 
            class="upload-trigger-btn" 
            @click="triggerSelectFile" 
            :disabled="isUploading"
          >
             <img 
              v-if="currentPhotoUrl" 
              :src="currentPhotoUrl" 
              class="uploaded-preview-img" 
            />
            <img 
              v-if="previewUrl" 
              :src="previewUrl" 
              class="uploaded-preview-img" 
            />
            <span v-else class="plus-icon">➕</span>
          </button>

          <input 
            type="file" 
            accept="image/*" 
            ref="fileInput" 
            @change="handleFileChange" 
            style="display: none;" 
          />

          <button 
            v-if="selectedFile" 
            class="submit-photo-btn"
            @click="uploadPhoto" 
            :disabled="isUploading"
          >
            {{ isUploading ? '...' : 'Сохранить' }}
          </button>
        </div>
        <div v-else>Photo</div> -->
        <img
          :src="previewUrl"
          class="uploaded-preview-img" 
        />
      </div>
    </div>

    <div class="team-info-wrapper">
      <div class="team-meta">
        <h3 class="team-name">{{ team.name }}</h3>
        <p class="team-description">Описание костюма и персонажей...</p>
        <!-- TODO DESCRIPT AND PARTICIPANTS -->
      </div>
      <keep-alive>
        <VoteButtonGroup :team-id="team.id" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { getTeamPhoto, uploadTeamPhoto } from '@/api/teams.api';
import VoteButtonGroup from '@/components/VoteButtonGroup.vue'
import { mapGetters  } from 'vuex';
export default {
  name: 'TeamCard',

  components: {
    VoteButtonGroup,
  },

  data() {
    return {
      selectedFile: null,
      previewUrl: null,
      isUploading: false,
    }
  },

  props: {
    team: {
      type: Object,
      required: true,
      default: () => ({})
    },
  },

  computed: {
    ...mapGetters(['currentUserIsAdmin']),

    getToken() {
      return sessionStorage.getItem('token')
    },
  },

  methods: {
    // Вызывает скрытое окно выбора файла при клике на область с плюсиком
    triggerSelectFile() {
      this.$refs.fileInput.click();
    },
    
    handleFileChange(event) {
      const file = event.target.files[0]; // Берем первый файл
      if (file) {
        this.selectedFile = file;
        this.previewUrl = URL.createObjectURL(file);
      }
    },

    // 2. Отправляем файл на бэкенд
    async uploadPhoto() {
      const formData = new FormData()
      formData.append('photo', this.selectedFile)
        const response = await fetch(`/api/votes/teams/${this.team.id}/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${this.getToken}`
          }
        });

        console.log('response ->', response);
        
      // uploadTeamPhoto(this.team.id, formData)
    },

    async fetchTeamPhoto() {
        const response = await getTeamPhoto(this.team.id)

        console.log('response', response.data);
        

        if (!response.data?.error) {
          this.previewUrl = URL.createObjectURL(response.data);
        } else {
          console.log('Фото у команды отсутствует в БД (покажем плюс)');
          this.previewUrl = null;
        }
    }
  },

  async mounted() {
    await this.fetchTeamPhoto();
  },
};
</script>

<style scoped>
/* Сама карточка команды */
.team-card {
  display: flex;
  border: 2px solid #222;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  height: 220px; /* Фиксируем высоту для ровной сетки */
}

/* Контейнер для фото */
.team-photo-wrapper {
  width: 45%;
  border-right: 2px solid #222;
  background: #f0f0f0;
}
.team-photo-placeholder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  font-weight: bold;
  color: #888;
}

/* Правая текстовая часть */
.team-info-wrapper {
  width: 55%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.team-name {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
}
.team-participants {
  margin: 0 0 5px 0;
  font-weight: bold;
  font-size: 0.9rem;
}
.team-description {
  margin: 0;
  font-size: 0.85rem;
  color: #555;
}

/* Блок круглых кнопок, прижатый к правому нижнему углу */
.vote-buttons-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* Круглые кнопки как на схеме */
.score-badge-btn {
  width: 36px;
  height: 36px;
  border: 2px solid #222;
  border-radius: 50%;
  background: #fff;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Состояние: балл выбран для ЭТОЙ команды */
.score-badge-btn.is-active {
  background: #222;
  color: #fff;
}

/* Состояние: этот балл уже отдан ДРУГОЙ команде (опциональное приглушение) */
.score-badge-btn.is-disabled {
  border-color: #bbb;
  color: #bbb;
  pointer-events: none;
}

/* Область-контейнер */
.upload-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

/* Наша кастомная квадратная кнопка вместо стандартного инпута */
.upload-trigger-btn {
  width: 100px;  /* Подгони размер под свои карточки */
  height: 100px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.upload-trigger-btn:hover {
  border-color: #4caf50;
  background-color: #f1fbf2;
}

/* Иконка плюсика по центру */
.plus-icon {
  font-size: 32px;
  color: #aaa;
  line-height: 1;
}

.upload-trigger-btn:hover .plus-icon {
  color: #4caf50;
}

/* Стили превью картинки внутри кнопки, чтобы заполняла весь квадрат */
.uploaded-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Кнопка «Сохранить» под квадратом */
.submit-photo-btn {
  padding: 4px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.submit-photo-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Адаптив под мобилки: 1 карточка в ряд, кнопки уходят вниз, если нужно */
@media (max-width: 768px) {
  .team-card {
    height: auto;
    flex-direction: column;
  }
  .team-photo-wrapper {
    width: 100%;
    border-right: none;
    border-bottom: 2px solid #222;
  }
  .team-info-wrapper {
    width: 100%;
    gap: 15px;
  }
}
</style>
