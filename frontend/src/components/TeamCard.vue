<template>
  <div class="team-card">
    <div class="team-photo-wrapper">
      <div class="team-photo-placeholder">Photo</div>
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
import VoteButtonGroup from '@/components/VoteButtonGroup.vue'

export default {
  name: 'TeamCard',

  components: {
    VoteButtonGroup,
  },
  
  props: {
    team: {
      type: Object,
      required: true,
      default: () => ({})
    },
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
  justify-content: center;
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

/* Адаптив под мобилки: 1 карточка в ряд, кнопки уходят вниз, если нужно */
@media (max-width: 768px) {
  .team-card {
    height: auto;
    flex-direction: column;
  }
  .team-photo-wrapper {
    width: 100%;
    height: 200px;
    border-right: none;
    border-bottom: 2px solid #222;
  }
  .team-info-wrapper {
    width: 100%;
    gap: 15px;
  }
}
</style>
