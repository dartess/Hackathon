import numpy as np
import matplotlib.pyplot as plt


def main():
    x = np.arange(0, 5, 0.1)
    y = np.sin(x)
    plt.plot(x, y)


if __name__ == '__main__':
    main()
    print("Finish")
