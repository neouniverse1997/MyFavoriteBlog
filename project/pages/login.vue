<template>
  <v-app>
    <v-container flex>
      <v-layout wrap>
        <v-flex xs12 sm4 class="hidden-xs-and-down"></v-flex>
        <v-flex xs12 sm4>
          <v-card>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="mdi-account-circle" label="Username" />
                <v-text-field
                  prepend-icon="mdi-lock"
                  label="Password"
                  type="password"
                  append-icon="mdi-eye-off"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn>LogIN</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 sm4 class="hidden-xs-and-down"></v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {};
</script>