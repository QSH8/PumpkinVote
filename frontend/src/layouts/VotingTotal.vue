<template>
  <div class="autumn-container">
    <!-- Шапка модуля -->
    <header class="autumn-header">
      <h1>
        <span>
          Итоги
        </span>
        <!-- <button type="button" @click="reload" style="position:absolute">
          Перезагрузить
        </button> -->
      </h1>
    </header>

    <!-- Список категорий -->
    <main class="categories-list">
      <section 
        v-for="(teams, categoryKey) in sortedTableData" 
        :key="categoryKey" 
        class="category-card"
      >
        <!-- Название категории -->
        <h2 class="category-title">
          {{ categoryKey }}
        </h2>

        <!-- Таблица команд -->
        <div class="table-wrapper">
          <table class="autumn-table">
            <thead>
              <tr>
                <th class="th-team">Команда</th>
                <th class="th-score">Очки</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(team, index) in teams" 
                :key="team.team_id"
                :class="{ 'top-place': index === 0 }"
              >
                <td class="td-team">
                  <span class="position-badge">{{ index + 1 }}</span>
                  <span class="team-name">{{ team.team_name }}</span>
                </td>
                <td class="td-score">
                  <span class="score-value">{{ team.totalScore }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <header class="autumn-header">
        <h1>
          <span>
            Статус голосования
          </span>
          <!-- <button type="button" @click="reload" style="position:absolute">
            Перезагрузить
          </button> -->
        </h1>
      </header>


      <!-- Статус голосования по пользователям -->
      <section class="category-card">
        <!-- Таблица пользователей -->
        <div class="table-wrapper">
          <table class="autumn-table">
            <thead>
              <tr>
                <th class="th-team">Имя</th>
                <th class="th-score">Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                 v-for="(user, index) in sortByVotingStatus"
                :key="user.id"
                :class="{ 'top-place': index === 0 }"
              >
                <td class="td-team">
                  <span class="position-badge">{{ index + 1 }}</span>
                  <span class="team-name">{{ user.username }}</span>
                </td>
                <td class="td-score">
                  <span 
                    class="status-icon" 
                    :class="user.alreadyvoted ? 'status-true' : 'status-false'"
                  >
                    {{ user.alreadyvoted ? '✓' : '✕' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>


      </section>
    </main>
  </div>
</template>

<script>
import { fetchTotalDataAPI, fetchUsersVotedAPI } from '@/api/votes.api';

export default {
  name: 'AutumnTable',
  data() {
    return {
      tableData: {
        // category_1: [
        //   { teamId: 1, teamName: 'Team 4', score: 20 },
        //   { teamId: 2, teamName: 'Team 5', score: 10 },
        //   { teamId: 3, teamName: 'Team 6', score: 45 },
        // ],
        // category_2: [
        //   { teamId: 4, teamName: 'Team 7', score: 30 },
        //   { teamId: 5, teamName: 'Team 8', score: 15 },
        //   { teamId: 6, teamName: 'Team 9', score: 50 },
        // ],
        // category_3: [
        //   { teamId: 7, teamName: 'Team 10', score: 40 },
        //   { teamId: 8, teamName: 'Team 11', score: 10 },
        //   { teamId: 9, teamName: 'Team 12', score: 5 },
        // ]
      },
      users: []
    };
  },
  computed: {
    sortByVotingStatus() {
      return [...this.users].sort((a, b) => (a.alreadyVoted === b.alreadyVoted) ? 0 : a.alreadyVoted ? 1 : -1)
    },
    sortedTableData() {
      const sorted = {};
      
      Object.keys(this.tableData).forEach(key => {
        sorted[key] = [...this.tableData[key]].sort((a, b) => {
          return Number(b.score) - Number(a.score);
        });
      });
      
      return sorted;
    }
  },
  methods: {
    formatCategoryName(key) {
      const number = key.split('_')[1];
      return number ? `Категория ${number}` : key;
    },

    async fetchTotalData() {
      const res = await fetchTotalDataAPI()

      console.log('res ->', res);
      

      if (!res?.error) {
        this.tableData = res.data
      }
    },

    async fetchUsersVoted() {
      const res = await fetchUsersVotedAPI()

      console.log('res ->', res);
      

      if (!res?.error) {
        this.users = !!res?.data?.length ? res.data : []
      }
    },

    async reload() {
      await this.fetchTotalData()
      await this.fetchUsersVoted()
    }
  },

  async created() {
    await this.reload()
  }
};
</script>

<style scoped>
/* Глубокая осенняя палитра */
.autumn-container {
  background-color: #1e120e; /* Очень темный шоколадно-коричневый фон */
  color: #f7e6d4; /* Мягкий кремовый текст */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  padding: 16px;
  min-height: 100vh;
  box-sizing: border-box;
}

.autumn-header {
  text-align: center;
  margin-bottom: 24px;
}

.autumn-header h1 {
  color: #d96b27; /* Насыщенный тыквенный */
  font-size: 1.8rem;
  margin: 0 0 4px 0;
  font-weight: 700;
}

.autumn-header .subtitle {
  color: #a66238; /* Приглушенный терракотовый */
  margin: 0;
  font-size: 0.9rem;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Карточка категории */
.category-card {
  background-color: #2b1b15; /* Темно-коричневый для карточек */
  border: 1px solid #42281f;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.category-title {
  color: #f29c38; /* Теплый оранжевый/янтарный */
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 14px;
  font-weight: 600;
  border-left: 4px solid #d96b27;
  padding-left: 8px;
}

.table-wrapper {
  overflow-x: auto;
}

.autumn-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.95rem;
}

.autumn-table th {
  color: #a66238;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-bottom: 8px;
  border-bottom: 1px solid #42281f;
}

.th-team { width: 75%; }
.th-score { width: 25%; text-align: right; }

.autumn-table td {
  padding: 10px 0;
  border-bottom: 1px solid #362119;
  vertical-align: middle;
}

.autumn-table tr:last-child td {
  border-bottom: none;
}

/* Стилизация строк и позиций */
.td-team {
  display: flex;
  align-items: center;
  gap: 10px;
}

.position-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background-color: #3d261e;
  color: #a66238;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: bold;
}

.team-name {
  color: #f7e6d4;
  font-weight: 500;
}

.td-score {
  text-align: right;
}

.score-value {
  color: #f29c38;
  font-weight: 700;
  background-color: #3d261e;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.9rem;
}

/* Особенный стиль для 1-го места (Лидера) */
.top-place .position-badge {
  background-color: #d96b27;
  color: #1e120e;
}

.top-place .team-name {
  color: #ffc880; /* Яркий золотисто-тыквенный оттенок для лидера */
}

.top-place .score-value {
  background-color: #d96b27;
  color: #ffffff;
}
</style>
