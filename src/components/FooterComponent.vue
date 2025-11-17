<script setup lang="ts">
const teamMembers = [
  {
    name: 'Дідичук Максим Ілліч',
    group: '343-3',
    github: 'https://github.com/Maksim0403'
  },
  {
    name: 'Буждиган Владислав Васильович',
    group: '343-3',
    github: 'https://github.com/vladbuzhdyhan'
  },
]
</script>

<template>
  <footer class="bg-dark text-white mt-auto py-4">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h5>E-Commerce App</h5>
          <p class="text-muted">Лабораторна робота №9-10</p>
        </div>

        <div class="col-md-6">
          <ul class="list-unstyled">

            <li v-for="(member, index) in teamMembers" :key="index" class="mb-2">
              <strong>{{ member.name }}</strong> - {{ member.group }}
              <br>
              <a :href="member.github" target="_blank" class="text-primary">
                GitHub Profile
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr class="bg-secondary">

      <div class="text-center">
        <small>&copy; 2025 Vue E-Commerce. Platzi Fake Store API.</small>
      </div>
    </div>
  </footer>
</template>
