# Payment Application

## Overview

This is a modern payment application built with the Quasar Framework (Vue.js). It provides a user interface for handling various payment-related operations, including card payments, displaying payment summaries, and managing processing fees.

## Features

*   **Card Payment Form**: Securely input and process card details.
*   **Payment Summary**: View a detailed breakdown of charges.
*   **Processing Fee Dialog**: Handle and display processing fees.
*   **Review Payment Dialog**: Confirm payment details before finalization.
*   **Location Selector**: (If applicable, based on `LocationSelector.vue`) Select payment locations or regions.
*   **Internationalization (i18n)**: Support for multiple languages (currently English, based on `src/i18n/en.json`).
*   **State Management**: Utilizes Pinia for efficient state management.
*   **API Integration**: Configured with Axios for making HTTP requests to backend services.

## Project Structure

*   `src/boot/`: Quasar boot files for initial setup (Axios, i18n, Pinia).
*   `src/components/`: Reusable Vue components for UI elements (e.g., `CardPaymentForm.vue`, `PaymentSummary.vue`).
*   `src/css/`: Application-specific and Quasar variable SCSS files for styling.
*   `src/i18n/`: Language translation files.
*   `src/layouts/`: Main application layout.
*   `src/pages/`: Main application pages (e.g., `PaymentPage.vue`, `IndexPage.vue`).
*   `src/router/`: Vue Router configuration for navigation.
*   `src/stores/`: Pinia stores for application state.

## Installation

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or pnpm (pnpm is used in `pnpm-lock.yaml`)

### Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd payment-text
    ```

2.  **Install dependencies:**

    If using pnpm:
    ```bash
    pnpm install
    ```
    If using npm:
    ```bash
    npm install
    ```

## Usage

### Development Server

To run the application in development mode with hot-reloading:

```bash
quasar dev
```

This will typically start the application at `http://localhost:8080`.

### Build for Production

To build the application for production deployment:

```bash
quasar build
```

The compiled assets will be located in the `dist/` directory.

## Configuration

*   **Quasar Configuration**: `quasar.config.js` for framework-specific settings.
*   **ESLint**: `eslint.config.js` for code linting rules.
*   **Prettier**: `.prettierrc.json` for code formatting.
*   **PostCSS**: `postcss.config.js` for CSS post-processing.

## Contributing

Contributions are welcome! Please follow standard Git flow:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

(Add your license information here, e.g., MIT License)

## Contact

(Add contact information here, e.g., your email or project maintainer's email)
