const DEFAULT_CELL = { passed: false, type: "cell" };
const WALL_CELL = { passed: false, type: "wall" };
const DOOR_ENTRY = { passed: true, type: "entry" };
const DOOR_EXIT = { passed: false, type: "exit" };

export class MazeBuilder {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.cols = 2 * this.width + 1;
    this.rows = 2 * this.height + 1;

    this.maze = this.initArray(DEFAULT_CELL);

    // place initial walls
    this.maze.forEach((row, r) => {
      row.forEach((cell, c) => {
        switch (r) {
          case 0:
          case this.rows - 1:
            this.maze[r][c] = { ...WALL_CELL };
            break;

          default:
            if (r % 2 === 1) {
              if (c === 0 || c === this.cols - 1) {
                this.maze[r][c] = { ...WALL_CELL };
              }
            } else if (c % 2 === 0) {
              this.maze[r][c] = { ...WALL_CELL };
            }
        }
      });

      if (r === 0) {
        console.log(r)
        let doorPos = this.posToSpace(this.rand(1, this.width));
        this.maze[r][doorPos] = { ...DOOR_ENTRY };
        this.entryPos = [r, doorPos]
      }

      if (r === this.rows - 1) {
        // place exit in bottom row
        let doorPos = this.posToSpace(this.rand(1, this.width));
        this.maze[r][doorPos] = { ...DOOR_EXIT };
        this.exitPos = [r, doorPos]
      }
    });

    // start partitioning
    this.partition(1, this.height - 1, 1, this.width - 1);
  }

  initArray(value) {
    return new Array(this.rows)
      .fill()
      .map(() => new Array(this.cols).fill(value));
  }

  rand(min, max) {
    return min + Math.floor(Math.random() * (1 + max - min));
  }

  posToSpace(x) {
    return 2 * (x - 1) + 1;
  }

  posToWall(x) {
    return 2 * x;
  }

  inBounds(r, c) {
    if (
      typeof this.maze[r] === "undefined" ||
      typeof this.maze[r][c] === "undefined"
    ) {
      return false; // out of bounds
    }
    return true;
  }

  shuffle(array) {
    // saurce: https://stackoverflow.com/a/12646864
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  partition(r1, r2, c1, c2) {
    // create partition walls
    // ref: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method

    let horiz, vert, x, y, start, end;

    if (r2 < r1 || c2 < c1) {
      return false;
    }

    if (r1 === r2) {
      horiz = r1;
    } else {
      x = r1 + 1;
      y = r2 - 1;
      start = Math.round(x + (y - x) / 4);
      end = Math.round(x + (3 * (y - x)) / 4);
      horiz = this.rand(start, end);
    }

    if (c1 === c2) {
      vert = c1;
    } else {
      x = c1 + 1;
      y = c2 - 1;
      start = Math.round(x + (y - x) / 3);
      end = Math.round(x + (2 * (y - x)) / 3);
      vert = this.rand(start, end);
    }

    for (let i = this.posToWall(r1) - 1; i <= this.posToWall(r2) + 1; i++) {
      for (let j = this.posToWall(c1) - 1; j <= this.posToWall(c2) + 1; j++) {
        if (i === this.posToWall(horiz) || j === this.posToWall(vert)) {
          this.maze[i][j] = { ...WALL_CELL };
        }
      }
    }

    let gaps = this.shuffle([true, true, true, false]);

    // create gaps in partition walls

    if (gaps[0]) {
      let gapPosition = this.rand(c1, vert);
      this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = {
        ...DEFAULT_CELL
      };
    }

    if (gaps[1]) {
      let gapPosition = this.rand(vert + 1, c2 + 1);
      this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = {
        ...DEFAULT_CELL
      };
    }

    if (gaps[2]) {
      let gapPosition = this.rand(r1, horiz);
      this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = {
        ...DEFAULT_CELL
      };
    }

    if (gaps[3]) {
      let gapPosition = this.rand(horiz + 1, r2 + 1);
      this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = {
        ...DEFAULT_CELL
      };
    }

    // recursively partition newly created chambers

    this.partition(r1, horiz - 1, c1, vert - 1);
    this.partition(horiz + 1, r2, c1, vert - 1);
    this.partition(r1, horiz - 1, vert + 1, c2);
    this.partition(horiz + 1, r2, vert + 1, c2);
  }

  isGap(...cells) {
    return cells.every((array) => {
      let row, col;
      [row, col] = array;
      if (this.maze[row][col].length > 0) {
        if (
          !this.maze[row][col].type === "exit" ||
          !this.maze[row][col].type === "entry"
        ) {
          return false;
        }
      }
      return true;
    });
  }

}
