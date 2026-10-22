<template>
  <div v-if="isOpen" class="modal-overlay">
    <div v-click-outside="closeModal" class="modal-content">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button @click="closeModal" class="close-btn">&times;</button>
      </div>

      <div class="modal-body">
        <p>{{ message }}</p>
      </div>

      <div class="modal-footer">
        <button @click="cancelModal" class="btn btn-secondary">
          {{ cancelText }}
        </button>
        <button @click="confirmModal" class="btn btn-primary">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',

  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: 'Подтверждение действия'
    },
    message: {
      type: String,
      default: 'Вы уверены, что хотите продолжить?'
    },
    confirmText: {
      type: String,
      default: 'Да'
    },
    cancelText: {
      type: String,
      default: 'Отмена'
    }
  },

  // Объявление событий, которые компонент передает родителю
  emits: ['confirm', 'close'],

  methods: {
    confirmModal() {
      this.$emit('confirm');
      this.closeModal();
    },
    cancelModal() {
      this.closeModal();
    },
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="css" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}
</style>